from __future__ import annotations

import os
from types import SimpleNamespace
from typing import Any

from create_wallets import create_or_open_monero_wallet, derive_bip39_addresses

from walletlib.store import WalletStore


CHAIN_TICKERS = {"BTC", "LTC", "ETH", "SOL"}
TOKEN_TICKERS = {"USDC", "USDT"}
SUPPORTED_TICKERS = CHAIN_TICKERS | TOKEN_TICKERS | {"XMR"}
TOKEN_NETWORKS = {"ethereum", "solana"}


class AddressValidationError(ValueError):
    pass


def normalize_ticker(ticker: str) -> str:
    normalized = ticker.upper()
    if normalized not in SUPPORTED_TICKERS:
        supported = ", ".join(sorted(SUPPORTED_TICKERS))
        raise AddressValidationError(f"Unsupported ticker {normalized}. Use one of: {supported}")
    return normalized


def normalize_network(ticker: str, network: str | None) -> str | None:
    ticker = normalize_ticker(ticker)
    if ticker in TOKEN_TICKERS:
        normalized = (network or "ethereum").lower()
        if normalized not in TOKEN_NETWORKS:
            raise AddressValidationError("network must be ethereum or solana for USDC/USDT")
        return normalized
    if network:
        raise AddressValidationError(f"network is only supported for USDC/USDT, not {ticker}")
    return None


def build_bip39_address_response(
    *,
    ticker: str,
    network: str | None,
    index: int,
    mnemonic: str,
    label: str | None,
) -> dict[str, Any]:
    ticker = normalize_ticker(ticker)
    network = normalize_network(ticker, network)
    all_addresses = derive_bip39_addresses(mnemonic, index)
    lower = ticker.lower()

    if ticker in CHAIN_TICKERS:
        response = {
            "ticker": ticker,
            "index": index,
            **all_addresses[lower],
        }
    else:
        token = all_addresses[lower][network]
        response = {
            "ticker": ticker,
            "network": network,
            "index": index,
            **token,
            "note": (
                f"{ticker} is a token. On {network}, monitor this token metadata plus the owner address."
            ),
        }

    if label is not None:
        response["label"] = label
    return response


def allocate_bip39_address(
    *,
    store: WalletStore,
    ticker: str,
    network: str | None,
    label: str | None,
    mnemonic: str | None,
) -> dict[str, Any]:
    ticker = normalize_ticker(ticker)
    network = normalize_network(ticker, network)
    if not mnemonic:
        raise AddressValidationError(
            "Set BIP39_MNEMONIC in .env for BTC/LTC/ETH/SOL/USDC/USDT allocation."
        )
    index = store.allocate_index(ticker, network)
    metadata = build_bip39_address_response(
        ticker=ticker,
        network=network,
        index=index,
        mnemonic=mnemonic,
        label=label,
    )
    return store.insert_address(
        ticker=ticker,
        network=network,
        label=label,
        derivation_index=index,
        metadata=metadata,
    )


def allocate_xmr_address(
    *,
    store: WalletStore,
    label: str | None,
    xmr_rpc_url: str,
    xmr_rpc_user: str | None,
    xmr_rpc_password: str | None,
    xmr_wallet_name: str,
    xmr_wallet_password: str | None,
) -> dict[str, Any]:
    args = SimpleNamespace(
        label=label or "receive",
        xmr_rpc_url=xmr_rpc_url,
        xmr_rpc_user=xmr_rpc_user,
        xmr_rpc_password=xmr_rpc_password,
        xmr_wallet_name=xmr_wallet_name,
        xmr_wallet_password=xmr_wallet_password,
        generate_xmr_wallet_password=False,
        print_secrets=False,
    )
    try:
        result = create_or_open_monero_wallet(args)
    except ValueError as exc:
        raise AddressValidationError(str(exc)) from exc
    metadata = {
        "ticker": "XMR",
        "label": label,
        "address": result["subaddress"],
        "address_index": result["address_index"],
        "primary_address": result["primary_address"],
        "wallet_name": result["wallet_name"],
        "note": result["note"],
    }
    return store.insert_address(
        ticker="XMR",
        network=None,
        label=label,
        derivation_index=result.get("address_index"),
        metadata=metadata,
    )


def allocate_address(
    *,
    store: WalletStore,
    ticker: str,
    network: str | None,
    label: str | None,
    mnemonic: str | None = None,
    xmr_rpc_url: str | None = None,
    xmr_rpc_user: str | None = None,
    xmr_rpc_password: str | None = None,
    xmr_wallet_name: str = "cryptoqr",
    xmr_wallet_password: str | None = None,
) -> dict[str, Any]:
    ticker = normalize_ticker(ticker)
    network = normalize_network(ticker, network)
    if ticker == "XMR":
        return allocate_xmr_address(
            store=store,
            label=label,
            xmr_rpc_url=xmr_rpc_url or os.getenv("XMR_WALLET_RPC_URL", "http://monero-wallet-rpc:18083"),
            xmr_rpc_user=xmr_rpc_user or os.getenv("MONERO_WALLET_RPC_USER"),
            xmr_rpc_password=xmr_rpc_password or os.getenv("MONERO_WALLET_RPC_PASSWORD"),
            xmr_wallet_name=xmr_wallet_name,
            xmr_wallet_password=xmr_wallet_password or os.getenv("XMR_NEW_WALLET_PASSWORD"),
        )
    return allocate_bip39_address(
        store=store,
        ticker=ticker,
        network=network,
        label=label,
        mnemonic=mnemonic or os.getenv("BIP39_MNEMONIC"),
    )
