#!/usr/bin/env python3
import argparse
import json
import os
import secrets
import sys
from getpass import getpass
from pathlib import Path
from typing import Any

import requests
from requests.auth import HTTPDigestAuth
from bip_utils import (
    Bip39Languages,
    Bip39MnemonicGenerator,
    Bip39SeedGenerator,
    Bip39WordsNum,
    Bip44,
    Bip44Changes,
    Bip44Coins,
    Bip84,
    Bip84Coins,
)
from spl.token.instructions import get_associated_token_address
from solders.pubkey import Pubkey


DEFAULT_SOL_USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
DEFAULT_SOL_USDT_MINT = "Es9vMFrzaCERmJfrF4H2FYD4oQMB3nY7yV5LSD9kL7s"
LOCAL_ENV_PATH = Path.cwd() / ".env"


def load_local_env() -> None:
    env_path = LOCAL_ENV_PATH
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


def read_env_lines(path: Path = LOCAL_ENV_PATH) -> list[str]:
    if not path.exists():
        return []
    return path.read_text(encoding="utf-8").splitlines()


def upsert_local_env(values: dict[str, str], path: Path = LOCAL_ENV_PATH) -> None:
    if not values:
        return

    lines = read_env_lines(path)
    seen: set[str] = set()
    updated: list[str] = []

    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in line:
            updated.append(line)
            continue

        key, _ = line.split("=", 1)
        key = key.strip()
        if key in values:
            updated.append(f"{key}={values[key]}")
            seen.add(key)
        else:
            updated.append(line)

    missing = [key for key in values if key not in seen]
    if missing and updated and updated[-1] != "":
        updated.append("")
    for key in missing:
        updated.append(f"{key}={values[key]}")

    path.write_text("\n".join(updated) + "\n", encoding="utf-8")
    path.chmod(0o600)


def random_password() -> str:
    return secrets.token_urlsafe(48)


def derive_bip39_addresses(mnemonic: str, index: int) -> dict[str, Any]:
    seed = Bip39SeedGenerator(mnemonic).Generate()

    btc_ctx = (
        Bip84.FromSeed(seed, Bip84Coins.BITCOIN)
        .Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(index)
    )
    ltc_ctx = (
        Bip84.FromSeed(seed, Bip84Coins.LITECOIN)
        .Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(index)
    )
    eth_ctx = (
        Bip44.FromSeed(seed, Bip44Coins.ETHEREUM)
        .Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(index)
    )
    sol_ctx = (
        Bip44.FromSeed(seed, Bip44Coins.SOLANA)
        .Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(index)
    )

    sol_owner = Pubkey.from_string(sol_ctx.PublicKey().ToAddress())
    sol_usdc_mint = Pubkey.from_string(os.getenv("SOL_USDC_MINT", DEFAULT_SOL_USDC_MINT))
    sol_usdt_mint = Pubkey.from_string(os.getenv("SOL_USDT_MINT", DEFAULT_SOL_USDT_MINT))

    return {
        "btc": {
            "address": btc_ctx.PublicKey().ToAddress(),
            "path": f"m/84'/0'/0'/0/{index}",
            "note": "Native SegWit receive address. Monitor with descriptor/xpub or imported address.",
        },
        "ltc": {
            "address": ltc_ctx.PublicKey().ToAddress(),
            "path": f"m/84'/2'/0'/0/{index}",
            "note": "Native SegWit receive address. Monitor with Litecoin Core or an indexer.",
        },
        "eth": {
            "address": eth_ctx.PublicKey().ToAddress(),
            "path": f"m/44'/60'/0'/0/{index}",
            "note": "Same address receives ETH and ERC-20 USDC/USDT on Ethereum.",
        },
        "sol": {
            "address": str(sol_owner),
            "path": f"m/44'/501'/0'/0/{index}",
            "note": "Same owner receives SOL. SPL tokens use associated token accounts.",
        },
        "usdc": {
            "ethereum": {
                "owner_address": eth_ctx.PublicKey().ToAddress(),
                "contract": os.getenv(
                    "ETH_USDC_CONTRACT",
                    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                ),
            },
            "solana": {
                "owner_address": str(sol_owner),
                "associated_token_account": str(
                    get_associated_token_address(sol_owner, sol_usdc_mint)
                ),
                "mint": str(sol_usdc_mint),
            },
        },
        "usdt": {
            "ethereum": {
                "owner_address": eth_ctx.PublicKey().ToAddress(),
                "contract": os.getenv(
                    "ETH_USDT_CONTRACT",
                    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                ),
            },
            "solana": {
                "owner_address": str(sol_owner),
                "associated_token_account": str(
                    get_associated_token_address(sol_owner, sol_usdt_mint)
                ),
                "mint": str(sol_usdt_mint),
            },
        },
    }


def monero_rpc(
    url: str,
    user: str,
    password: str,
    method: str,
    params: dict[str, Any] | None = None,
) -> dict[str, Any]:
    response = requests.post(
        f"{url.rstrip('/')}/json_rpc",
        headers={
            "Content-Type": "application/json",
        },
        auth=HTTPDigestAuth(user, password),
        json={
            "jsonrpc": "2.0",
            "id": "0",
            "method": method,
            "params": params or {},
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    if "error" in payload:
        raise RuntimeError(f"Monero RPC {method} failed: {payload['error']}")
    return payload["result"]


def create_or_open_monero_wallet(args: argparse.Namespace) -> dict[str, Any]:
    password = args.xmr_wallet_password
    if password is None:
        password = os.getenv("XMR_NEW_WALLET_PASSWORD")
    if password is None and args.generate_xmr_wallet_password:
        password = random_password()
        args.xmr_wallet_password = password
    if password is None and sys.stdin.isatty():
        password = getpass("New Monero wallet password: ")
    if not password:
        raise ValueError(
            "Set --xmr-wallet-password or XMR_NEW_WALLET_PASSWORD for Monero wallet creation."
        )

    rpc_user = args.xmr_rpc_user or os.getenv("MONERO_WALLET_RPC_USER", "")
    rpc_password = args.xmr_rpc_password or os.getenv("MONERO_WALLET_RPC_PASSWORD", "")
    if not rpc_user or not rpc_password:
        raise ValueError("Set Monero wallet RPC credentials.")

    try:
        monero_rpc(
            args.xmr_rpc_url,
            rpc_user,
            rpc_password,
            "create_wallet",
            {
                "filename": args.xmr_wallet_name,
                "password": password,
                "language": "English",
            },
        )
        created = True
    except RuntimeError as exc:
        if "already exists" not in str(exc).lower():
            raise
        monero_rpc(
            args.xmr_rpc_url,
            rpc_user,
            rpc_password,
            "open_wallet",
            {"filename": args.xmr_wallet_name, "password": password},
        )
        created = False

    address_result = monero_rpc(
        args.xmr_rpc_url,
        rpc_user,
        rpc_password,
        "create_address",
        {"account_index": 0, "label": args.label},
    )
    primary = monero_rpc(
        args.xmr_rpc_url,
        rpc_user,
        rpc_password,
        "get_address",
        {"account_index": 0},
    )

    result = {
        "wallet_name": args.xmr_wallet_name,
        "created": created,
        "primary_address": primary.get("address"),
        "subaddress": address_result.get("address"),
        "address_index": address_result.get("address_index"),
        "note": "Monitor this wallet through monero-wallet-rpc. Public XMR addresses alone are not enough.",
    }

    if args.print_secrets:
        spend_key = monero_rpc(
            args.xmr_rpc_url,
            rpc_user,
            rpc_password,
            "query_key",
            {"key_type": "mnemonic"},
        )
        result["mnemonic"] = spend_key.get("key")

    return result


def main() -> None:
    load_local_env()

    parser = argparse.ArgumentParser(
        description="Create headless wallet receive addresses for CryptoQR."
    )
    parser.add_argument("--index", type=int, default=0, help="HD address index.")
    parser.add_argument("--label", default="cryptoqr-0", help="Label for generated addresses.")
    parser.add_argument("--mnemonic", help="Existing BIP-39 mnemonic for BTC/LTC/ETH/SOL.")
    parser.add_argument(
        "--print-secrets",
        action="store_true",
        help="Print newly generated BIP-39/Monero mnemonics. Avoid using this in logs.",
    )
    parser.add_argument(
        "--no-save-env",
        action="store_true",
        help="Do not write generated wallet bootstrap settings to .env.",
    )
    parser.add_argument(
        "--include-xmr",
        action="store_true",
        help="Also create/open a Monero wallet via monero-wallet-rpc and create a subaddress.",
    )
    parser.add_argument(
        "--generate-xmr-wallet-password",
        action="store_true",
        help="Generate XMR_NEW_WALLET_PASSWORD when it is missing.",
    )
    parser.add_argument(
        "--xmr-rpc-url",
        default=os.getenv("XMR_WALLET_RPC_URL", "http://monero-wallet-rpc:18083"),
    )
    parser.add_argument("--xmr-rpc-user", default=os.getenv("MONERO_WALLET_RPC_USER"))
    parser.add_argument("--xmr-rpc-password", default=os.getenv("MONERO_WALLET_RPC_PASSWORD"))
    parser.add_argument("--xmr-wallet-name", default="cryptoqr")
    parser.add_argument("--xmr-wallet-password")
    parser.add_argument(
        "--output",
        default="out/wallet-addresses.json",
        help="Where to write JSON output.",
    )
    args = parser.parse_args()

    generated_mnemonic = False
    mnemonic = args.mnemonic or os.getenv("BIP39_MNEMONIC")
    if not mnemonic:
        mnemonic = Bip39MnemonicGenerator(Bip39Languages.ENGLISH).FromWordsNumber(
            Bip39WordsNum.WORDS_NUM_24
        )
        generated_mnemonic = True

    env_updates: dict[str, str] = {}
    if not args.no_save_env:
        if not os.getenv("BIP39_MNEMONIC"):
            env_updates["BIP39_MNEMONIC"] = str(mnemonic)
        if args.include_xmr and args.xmr_wallet_password and not os.getenv("XMR_NEW_WALLET_PASSWORD"):
            env_updates["XMR_NEW_WALLET_PASSWORD"] = args.xmr_wallet_password

    result: dict[str, Any] = {
        "label": args.label,
        "index": args.index,
        "addresses": derive_bip39_addresses(str(mnemonic), args.index),
    }

    if args.print_secrets:
        result["bip39_mnemonic"] = str(mnemonic)
    else:
        result["secret_note"] = (
            "BIP-39 mnemonic omitted from stdout. It was loaded from or written to .env."
        )

    if args.include_xmr:
        result["addresses"]["xmr"] = create_or_open_monero_wallet(args)
        if not args.no_save_env and not os.getenv("XMR_NEW_WALLET_PASSWORD"):
            xmr_password = args.xmr_wallet_password or os.getenv("XMR_NEW_WALLET_PASSWORD")
            if xmr_password:
                env_updates["XMR_NEW_WALLET_PASSWORD"] = xmr_password

    if env_updates:
        upsert_local_env(env_updates)
        for key, value in env_updates.items():
            os.environ.setdefault(key, value)
        result["env_updated"] = {
            "path": str(LOCAL_ENV_PATH),
            "keys": sorted(env_updates),
        }
    elif not args.no_save_env:
        result["env_updated"] = {
            "path": str(LOCAL_ENV_PATH),
            "keys": [],
            "note": "No .env changes were needed.",
        }

    if generated_mnemonic and args.no_save_env:
        result["secret_warning"] = (
            "A new BIP-39 mnemonic was generated but not saved because --no-save-env was used."
        )

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as handle:
        json.dump(result, handle, indent=2)
        handle.write("\n")

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
