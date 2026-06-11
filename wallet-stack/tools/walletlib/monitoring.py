from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Any

from monitor import (
    monitor_esplora,
    monitor_eth,
    monitor_eth_token,
    monitor_sol,
    monitor_spl_token,
    monitor_xmr,
)

from walletlib.allocation import AddressValidationError, normalize_network, normalize_ticker


@dataclass
class MonitorConfig:
    btc_api: str = "https://blockstream.info/api"
    ltc_api: str = "https://litecoinspace.org/api"
    eth_rpc_url: str = ""
    sol_rpc_url: str = "https://api.mainnet-beta.solana.com"
    eth_from_block: str | None = None
    xmr_rpc_url: str = "http://monero-wallet-rpc:18083"
    xmr_rpc_user: str | None = None
    xmr_rpc_password: str | None = None

    @classmethod
    def from_env(cls) -> "MonitorConfig":
        return cls(
            btc_api=os.getenv("BTC_EXPLORER_API", cls.btc_api),
            ltc_api=os.getenv("LTC_EXPLORER_API", cls.ltc_api),
            eth_rpc_url=os.getenv("ETH_RPC_URL", ""),
            sol_rpc_url=os.getenv("SOL_RPC_URL", cls.sol_rpc_url),
            eth_from_block=os.getenv("MONITOR_ETH_FROM_BLOCK"),
            xmr_rpc_url=os.getenv("XMR_WALLET_RPC_URL", cls.xmr_rpc_url),
            xmr_rpc_user=os.getenv("MONERO_WALLET_RPC_USER"),
            xmr_rpc_password=os.getenv("MONERO_WALLET_RPC_PASSWORD"),
        )


@dataclass
class XmrArgs:
    limit: int
    xmr_rpc_url: str
    xmr_rpc_user: str | None
    xmr_rpc_password: str | None


def record_metadata(record: dict[str, Any]) -> dict[str, Any]:
    metadata = dict(record.get("metadata") or {})
    metadata.setdefault("ticker", record.get("ticker"))
    if record.get("network") and "network" not in metadata:
        metadata["network"] = record["network"]
    if record.get("address") and "address" not in metadata:
        metadata["address"] = record["address"]
    return metadata


def monitor_entry(
    *,
    ticker: str,
    entry: dict[str, Any],
    network: str | None,
    limit: int,
    config: MonitorConfig | None = None,
) -> dict[str, Any]:
    config = config or MonitorConfig.from_env()
    ticker = normalize_ticker(ticker)
    network = normalize_network(ticker, network or entry.get("network")) if ticker in {"USDC", "USDT"} else None

    if ticker in {"ETH", "USDC", "USDT"} and not config.eth_rpc_url:
        raise AddressValidationError("Set ETH_RPC_URL in .env for ETH/ERC-20 monitoring.")

    if ticker == "BTC":
        return monitor_esplora("BTC", entry["address"], config.btc_api, limit)
    if ticker == "LTC":
        return monitor_esplora("LTC", entry["address"], config.ltc_api, limit)
    if ticker == "ETH":
        return monitor_eth(entry["address"], config.eth_rpc_url)
    if ticker == "SOL":
        return monitor_sol(entry["address"], config.sol_rpc_url, limit)
    if ticker in {"USDC", "USDT"}:
        if network == "ethereum":
            contract = entry.get("contract") or os.getenv(f"ETH_{ticker}_CONTRACT")
            owner = entry.get("owner_address") or entry.get("address")
            if not contract or not owner:
                raise AddressValidationError(f"Missing Ethereum owner/contract for {ticker}.")
            return monitor_eth_token(
                ticker,
                owner,
                contract,
                config.eth_rpc_url,
                limit,
                config.eth_from_block,
            )
        if network == "solana":
            token_account = entry.get("associated_token_account") or entry.get("address")
            if not token_account:
                raise AddressValidationError(f"Missing Solana associated token account for {ticker}.")
            return monitor_spl_token(ticker, token_account, config.sol_rpc_url, limit)
    if ticker == "XMR":
        return monitor_xmr(
            XmrArgs(
                limit=limit,
                xmr_rpc_url=config.xmr_rpc_url,
                xmr_rpc_user=config.xmr_rpc_user,
                xmr_rpc_password=config.xmr_rpc_password,
            )
        )
    raise AddressValidationError(f"Unsupported ticker: {ticker}")


def monitor_record(
    *,
    record: dict[str, Any],
    network: str | None,
    limit: int,
    config: MonitorConfig | None = None,
) -> dict[str, Any]:
    return monitor_entry(
        ticker=record["ticker"],
        entry=record_metadata(record),
        network=network,
        limit=limit,
        config=config,
    )


def monitor_explicit_address(
    *,
    ticker: str,
    address: str | None,
    network: str | None,
    limit: int,
    config: MonitorConfig | None = None,
) -> dict[str, Any]:
    ticker = normalize_ticker(ticker)
    if ticker != "XMR" and not address:
        raise AddressValidationError("address is required when address_id is not supplied.")
    entry: dict[str, Any] = {"ticker": ticker}
    if address:
        if ticker in {"USDC", "USDT"} and network == "solana":
            entry["associated_token_account"] = address
        else:
            entry["address"] = address
    if network:
        entry["network"] = network
    return monitor_entry(ticker=ticker, entry=entry, network=network, limit=limit, config=config)
