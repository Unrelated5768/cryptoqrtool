#!/usr/bin/env python3
import argparse
import json
import os
from pathlib import Path
from typing import Any

from create_wallets import (
    DEFAULT_SOL_USDC_MINT,
    DEFAULT_SOL_USDT_MINT,
    create_or_open_monero_wallet,
    derive_bip39_addresses,
    load_local_env,
)


CHAIN_TICKERS = {"BTC", "LTC", "ETH", "SOL"}
TOKEN_TICKERS = {"USDC", "USDT"}
SUPPORTED_TICKERS = CHAIN_TICKERS | TOKEN_TICKERS | {"XMR"}


def read_json(path: Path, default: dict[str, Any]) -> dict[str, Any]:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json_private(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(f"{path.suffix}.tmp")
    tmp_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    tmp_path.chmod(0o600)
    tmp_path.replace(path)
    path.chmod(0o600)


def next_index(state: dict[str, Any], ticker: str) -> int:
    key = ticker.lower()
    current = int(state.setdefault("next_index", {}).get(key, 0))
    state["next_index"][key] = current + 1
    return current


def token_network(args: argparse.Namespace) -> str:
    network = args.network.lower()
    if network not in {"ethereum", "solana"}:
        raise ValueError("--network must be ethereum or solana for USDC/USDT")
    return network


def build_address_response(
    ticker: str,
    index: int,
    mnemonic: str,
    args: argparse.Namespace,
) -> dict[str, Any]:
    all_addresses = derive_bip39_addresses(mnemonic, index)
    lower = ticker.lower()

    if ticker in CHAIN_TICKERS:
        return {
            "ticker": ticker,
            "index": index,
            **all_addresses[lower],
        }

    network = token_network(args)
    token = all_addresses[lower][network]
    return {
        "ticker": ticker,
        "network": network,
        "index": index,
        **token,
        "note": (
            f"{ticker} is a token. On {network}, monitor this token metadata plus the owner address."
        ),
    }


def append_history(path: Path, entry: dict[str, Any]) -> None:
    history = read_json(path, {"addresses": []})
    history.setdefault("addresses", []).append(entry)
    write_json_private(path, history)


def main() -> None:
    load_local_env()

    parser = argparse.ArgumentParser(description="Return the next receive address for a ticker.")
    parser.add_argument("ticker", help="BTC, LTC, ETH, SOL, XMR, USDC, or USDT.")
    parser.add_argument(
        "--network",
        default="ethereum",
        help="Token network for USDC/USDT: ethereum or solana. Default: ethereum.",
    )
    parser.add_argument("--label", default="receive", help="Label stored in output history.")
    parser.add_argument(
        "--mnemonic",
        default=os.getenv("BIP39_MNEMONIC"),
        help="BIP-39 mnemonic for BTC/LTC/ETH/SOL. Defaults to BIP39_MNEMONIC env.",
    )
    parser.add_argument(
        "--state",
        default="out/address-state.json",
        help="State file used to track the next derivation index.",
    )
    parser.add_argument(
        "--history",
        default="out/address-history.json",
        help="Append-only generated address history file.",
    )
    parser.add_argument(
        "--no-save",
        action="store_true",
        help="Print the address without updating state or history.",
    )
    parser.add_argument(
        "--xmr-rpc-url",
        default=os.getenv("XMR_WALLET_RPC_URL", "http://127.0.0.1:18083"),
    )
    parser.add_argument("--xmr-rpc-user", default=os.getenv("MONERO_WALLET_RPC_USER"))
    parser.add_argument("--xmr-rpc-password", default=os.getenv("MONERO_WALLET_RPC_PASSWORD"))
    parser.add_argument("--xmr-wallet-name", default="cryptoqr")
    parser.add_argument("--xmr-wallet-password", default=os.getenv("XMR_NEW_WALLET_PASSWORD"))
    parser.add_argument("--print-secrets", action="store_true")
    args = parser.parse_args()

    ticker = args.ticker.upper()
    if ticker not in SUPPORTED_TICKERS:
        supported = ", ".join(sorted(SUPPORTED_TICKERS))
        raise SystemExit(f"Unsupported ticker {ticker}. Use one of: {supported}")

    state_path = Path(args.state)
    history_path = Path(args.history)
    state = read_json(state_path, {"next_index": {}})

    if ticker == "XMR":
        result = create_or_open_monero_wallet(args)
        response = {
            "ticker": "XMR",
            "label": args.label,
            "address": result["subaddress"],
            "address_index": result["address_index"],
            "primary_address": result["primary_address"],
            "wallet_name": result["wallet_name"],
            "note": result["note"],
        }
    else:
        if not args.mnemonic:
            raise SystemExit(
                "Set BIP39_MNEMONIC in .env or pass --mnemonic for BTC/LTC/ETH/SOL/USDC/USDT."
            )
        index = next_index(state, ticker)
        response = build_address_response(ticker, index, args.mnemonic, args)
        response["label"] = args.label

    if not args.no_save:
        if ticker != "XMR":
            write_json_private(state_path, state)
        append_history(history_path, response)

    print(json.dumps(response, indent=2))


if __name__ == "__main__":
    main()
