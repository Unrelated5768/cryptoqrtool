#!/usr/bin/env python3
import argparse
import json
import os
from decimal import Decimal
from pathlib import Path
from typing import Any

import requests
from requests.auth import HTTPDigestAuth

from create_wallets import load_local_env


SAT = Decimal("100000000")
WEI = Decimal("1000000000000000000")
LAMPORTS = Decimal("1000000000")
ERC20_TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
ERC20_BALANCE_OF_SELECTOR = "0x70a08231"


def request_json(method: str, url: str, **kwargs: Any) -> Any:
    response = requests.request(method, url, timeout=30, **kwargs)
    response.raise_for_status()
    return response.json()


def rpc(url: str, method: str, params: list[Any]) -> Any:
    payload = {"jsonrpc": "2.0", "id": 1, "method": method, "params": params}
    result = request_json("POST", url, json=payload)
    if "error" in result:
        raise RuntimeError(f"{method} failed: {result['error']}")
    return result["result"]


def monero_rpc(url: str, user: str, password: str, method: str, params: dict[str, Any]) -> Any:
    result = request_json(
        "POST",
        f"{url.rstrip('/')}/json_rpc",
        headers={"Content-Type": "application/json"},
        auth=HTTPDigestAuth(user, password),
        json={"jsonrpc": "2.0", "id": "0", "method": method, "params": params},
    )
    if "error" in result:
        raise RuntimeError(f"Monero RPC {method} failed: {result['error']}")
    return result["result"]


def read_history(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    payload = json.loads(path.read_text(encoding="utf-8"))
    return payload.get("addresses", [])


def pick_history_entry(ticker: str, history: list[dict[str, Any]]) -> dict[str, Any] | None:
    for entry in reversed(history):
        if entry.get("ticker", "").upper() == ticker:
            return entry
    return None


def decimal_string(value: Decimal) -> str:
    normalized = value.normalize()
    return format(normalized, "f")


def esplora_received_outputs(tx: dict[str, Any], address: str) -> list[dict[str, Any]]:
    outputs = []
    for index, output in enumerate(tx.get("vout", [])):
        if output.get("scriptpubkey_address") == address and int(output.get("value", 0)) > 0:
            outputs.append({"vout": index, "sats": int(output["value"])})
    return outputs


def monitor_esplora(ticker: str, address: str, base_url: str, limit: int) -> dict[str, Any]:
    address_info = request_json("GET", f"{base_url.rstrip('/')}/address/{address}")
    chain = address_info.get("chain_stats", {})
    mempool = address_info.get("mempool_stats", {})
    balance_sats = (
        int(chain.get("funded_txo_sum", 0))
        - int(chain.get("spent_txo_sum", 0))
        + int(mempool.get("funded_txo_sum", 0))
        - int(mempool.get("spent_txo_sum", 0))
    )
    txs = request_json("GET", f"{base_url.rstrip('/')}/address/{address}/txs")

    received = []
    for tx in txs:
        outputs = esplora_received_outputs(tx, address)
        if not outputs:
            continue
        total_sats = sum(output["sats"] for output in outputs)
        received.append(
            {
                "txid": tx["txid"],
                "confirmed": bool(tx.get("status", {}).get("confirmed")),
                "block_time": tx.get("status", {}).get("block_time"),
                "amount": decimal_string(Decimal(total_sats) / SAT),
                "sats": total_sats,
                "outputs": outputs,
            }
        )
        if len(received) >= limit:
            break

    return {
        "ticker": ticker,
        "address": address,
        "balance": decimal_string(Decimal(balance_sats) / SAT),
        "balance_sats": balance_sats,
        "received": received,
        "source": base_url,
    }


def pad_eth_address(address: str) -> str:
    return "0x" + address.lower().removeprefix("0x").rjust(64, "0")


def token_balance_eth(rpc_url: str, contract: str, owner: str, decimals: int) -> dict[str, Any]:
    call_data = ERC20_BALANCE_OF_SELECTOR + owner.lower().removeprefix("0x").rjust(64, "0")
    raw = rpc(rpc_url, "eth_call", [{"to": contract, "data": call_data}, "latest"])
    amount = int(raw, 16)
    return {
        "raw": str(amount),
        "balance": decimal_string(Decimal(amount) / (Decimal(10) ** decimals)),
    }


def monitor_eth(address: str, rpc_url: str) -> dict[str, Any]:
    raw = rpc(rpc_url, "eth_getBalance", [address, "latest"])
    wei = int(raw, 16)
    return {
        "ticker": "ETH",
        "address": address,
        "balance": decimal_string(Decimal(wei) / WEI),
        "balance_wei": str(wei),
        "received": [],
        "history_note": "Native ETH transaction history requires an indexer API; JSON-RPC only gives balance here.",
        "source": rpc_url,
    }


def monitor_eth_token(
    ticker: str,
    owner: str,
    contract: str,
    rpc_url: str,
    limit: int,
    from_block: str | None,
) -> dict[str, Any]:
    decimals = 6 if ticker in {"USDC", "USDT"} else 18
    balance = token_balance_eth(rpc_url, contract, owner, decimals)
    received: list[dict[str, Any]] = []
    history_note = "Set MONITOR_ETH_FROM_BLOCK to enable ERC-20 Transfer log scanning."

    if from_block:
        logs = rpc(
            rpc_url,
            "eth_getLogs",
            [
                {
                    "fromBlock": from_block,
                    "toBlock": "latest",
                    "address": contract,
                    "topics": [ERC20_TRANSFER_TOPIC, None, pad_eth_address(owner)],
                }
            ],
        )
        for log in reversed(logs[-limit:]):
            raw_amount = int(log["data"], 16)
            received.append(
                {
                    "txid": log["transactionHash"],
                    "block_number": int(log["blockNumber"], 16),
                    "amount": decimal_string(Decimal(raw_amount) / (Decimal(10) ** decimals)),
                    "raw": str(raw_amount),
                }
            )
        history_note = None

    return {
        "ticker": ticker,
        "network": "ethereum",
        "owner_address": owner,
        "contract": contract,
        **balance,
        "received": received,
        "history_note": history_note,
        "source": rpc_url,
    }


def monitor_sol(address: str, rpc_url: str, limit: int) -> dict[str, Any]:
    balance = rpc(rpc_url, "getBalance", [address, {"commitment": "confirmed"}])
    signatures = rpc(
        rpc_url,
        "getSignaturesForAddress",
        [address, {"limit": min(limit * 3, 100), "commitment": "confirmed"}],
    )
    received = []
    for sig in signatures:
        tx = rpc(
            rpc_url,
            "getTransaction",
            [
                sig["signature"],
                {
                    "encoding": "json",
                    "commitment": "confirmed",
                    "maxSupportedTransactionVersion": 0,
                },
            ],
        )
        if not tx:
            continue
        keys = tx.get("transaction", {}).get("message", {}).get("accountKeys", [])
        account_index = None
        for index, key in enumerate(keys):
            key_value = key.get("pubkey") if isinstance(key, dict) else key
            if key_value == address:
                account_index = index
                break
        if account_index is None:
            continue
        meta = tx.get("meta", {})
        pre = meta.get("preBalances", [])
        post = meta.get("postBalances", [])
        if len(pre) <= account_index or len(post) <= account_index:
            continue
        delta = int(post[account_index]) - int(pre[account_index])
        if delta <= 0:
            continue
        received.append(
            {
                "txid": sig["signature"],
                "block_time": sig.get("blockTime"),
                "amount": decimal_string(Decimal(delta) / LAMPORTS),
                "lamports": delta,
            }
        )
        if len(received) >= limit:
            break

    lamports = int(balance["value"])
    return {
        "ticker": "SOL",
        "address": address,
        "balance": decimal_string(Decimal(lamports) / LAMPORTS),
        "balance_lamports": lamports,
        "received": received,
        "source": rpc_url,
    }


def monitor_spl_token(ticker: str, token_account: str, rpc_url: str, limit: int) -> dict[str, Any]:
    balance = rpc(rpc_url, "getTokenAccountBalance", [token_account, {"commitment": "confirmed"}])
    signatures = rpc(
        rpc_url,
        "getSignaturesForAddress",
        [token_account, {"limit": limit, "commitment": "confirmed"}],
    )
    return {
        "ticker": ticker,
        "network": "solana",
        "associated_token_account": token_account,
        "balance": balance["value"]["uiAmountString"],
        "raw": balance["value"]["amount"],
        "decimals": balance["value"]["decimals"],
        "received": [
            {
                "txid": item["signature"],
                "block_time": item.get("blockTime"),
                "status": "confirmed" if item.get("confirmationStatus") else None,
            }
            for item in signatures
        ],
        "history_note": "Solana public RPC gives account signatures here; parse full transactions for exact token deltas if needed.",
        "source": rpc_url,
    }


def monitor_xmr(args: argparse.Namespace) -> dict[str, Any]:
    user = args.xmr_rpc_user or os.getenv("MONERO_WALLET_RPC_USER", "")
    password = args.xmr_rpc_password or os.getenv("MONERO_WALLET_RPC_PASSWORD", "")
    if not user or not password:
        raise SystemExit("Set MONERO_WALLET_RPC_USER and MONERO_WALLET_RPC_PASSWORD in .env.")
    balance = monero_rpc(args.xmr_rpc_url, user, password, "get_balance", {"account_index": 0})
    transfers = monero_rpc(
        args.xmr_rpc_url,
        user,
        password,
        "get_transfers",
        {"in": True, "pool": True, "account_index": 0},
    )
    incoming = transfers.get("in", []) + transfers.get("pool", [])
    incoming.sort(key=lambda item: item.get("timestamp", 0), reverse=True)
    received = [
        {
            "txid": item.get("txid"),
            "address": item.get("address"),
            "subaddr_index": item.get("subaddr_index"),
            "amount": decimal_string(Decimal(int(item.get("amount", 0))) / Decimal("1000000000000")),
            "atomic_units": str(item.get("amount", 0)),
            "confirmations": item.get("confirmations"),
            "timestamp": item.get("timestamp"),
        }
        for item in incoming[: args.limit]
    ]
    return {
        "ticker": "XMR",
        "balance": decimal_string(Decimal(int(balance.get("balance", 0))) / Decimal("1000000000000")),
        "unlocked_balance": decimal_string(
            Decimal(int(balance.get("unlocked_balance", 0))) / Decimal("1000000000000")
        ),
        "atomic_balance": str(balance.get("balance", 0)),
        "received": received,
        "source": args.xmr_rpc_url,
    }


def resolve_target(args: argparse.Namespace, ticker: str) -> tuple[str, dict[str, Any]]:
    if args.address:
        return ticker, {"ticker": ticker, "address": args.address}
    entry = pick_history_entry(ticker, read_history(Path(args.history)))
    if entry:
        return ticker, entry
    raise ValueError(f"No address passed and no {ticker} entry found in {args.history}.")


def monitor_target(args: argparse.Namespace, ticker: str) -> dict[str, Any]:
    ticker, entry = resolve_target(args, ticker)
    if ticker == "BTC":
        return monitor_esplora("BTC", entry["address"], args.btc_api, args.limit)
    if ticker == "LTC":
        return monitor_esplora("LTC", entry["address"], args.ltc_api, args.limit)
    if ticker == "ETH":
        return monitor_eth(entry["address"], args.eth_rpc_url)
    if ticker == "SOL":
        return monitor_sol(entry["address"], args.sol_rpc_url, args.limit)
    if ticker in {"USDC", "USDT"}:
        network = (args.network or entry.get("network") or "ethereum").lower()
        if network == "ethereum":
            contract = entry.get("contract") or os.getenv(f"ETH_{ticker}_CONTRACT")
            owner = entry.get("owner_address") or entry.get("address")
            if not contract or not owner:
                raise SystemExit(f"Missing Ethereum owner/contract for {ticker}.")
            return monitor_eth_token(
                ticker, owner, contract, args.eth_rpc_url, args.limit, args.eth_from_block
            )
        if network == "solana":
            token_account = entry.get("associated_token_account") or args.address
            if not token_account:
                raise SystemExit(f"Missing Solana associated token account for {ticker}.")
            return monitor_spl_token(ticker, token_account, args.sol_rpc_url, args.limit)
        raise SystemExit("--network must be ethereum or solana.")
    if ticker == "XMR":
        return monitor_xmr(args)
    raise SystemExit(f"Unsupported ticker: {ticker}")


def main() -> None:
    load_local_env()
    parser = argparse.ArgumentParser(description="Get balance and last received transactions.")
    parser.add_argument(
        "ticker",
        nargs="?",
        help="BTC, LTC, ETH, SOL, XMR, USDC, or USDT. If omitted, checks all.",
    )
    parser.add_argument("address", nargs="?", help="Address/token account. Defaults to latest history entry.")
    parser.add_argument("--network", help="Token network for USDC/USDT: ethereum or solana.")
    parser.add_argument("--limit", type=int, default=10, help="Number of received transactions.")
    parser.add_argument("--history", default="out/address-history.json")
    parser.add_argument("--btc-api", default=os.getenv("BTC_EXPLORER_API", "https://blockstream.info/api"))
    parser.add_argument("--ltc-api", default=os.getenv("LTC_EXPLORER_API", "https://litecoinspace.org/api"))
    parser.add_argument("--eth-rpc-url", default=os.getenv("ETH_RPC_URL", ""))
    parser.add_argument("--sol-rpc-url", default=os.getenv("SOL_RPC_URL", "https://api.mainnet-beta.solana.com"))
    parser.add_argument("--eth-from-block", default=os.getenv("MONITOR_ETH_FROM_BLOCK"))
    parser.add_argument("--xmr-rpc-url", default=os.getenv("XMR_WALLET_RPC_URL", "http://127.0.0.1:18083"))
    parser.add_argument("--xmr-rpc-user", default=os.getenv("MONERO_WALLET_RPC_USER"))
    parser.add_argument("--xmr-rpc-password", default=os.getenv("MONERO_WALLET_RPC_PASSWORD"))
    args = parser.parse_args()

    if args.address and not args.ticker:
        raise SystemExit("Pass a ticker when passing an explicit address.")

    tickers = [args.ticker.upper()] if args.ticker else ["BTC", "LTC", "ETH", "SOL", "USDC", "USDT", "XMR"]

    if any(ticker in {"ETH", "USDC", "USDT"} for ticker in tickers) and not args.eth_rpc_url:
        if args.ticker:
            raise SystemExit("Set ETH_RPC_URL in .env or pass --eth-rpc-url.")

    if args.ticker:
        print(json.dumps(monitor_target(args, tickers[0]), indent=2))
        return

    results: dict[str, Any] = {}
    for ticker in tickers:
        try:
            if ticker in {"ETH", "USDC", "USDT"} and not args.eth_rpc_url:
                raise RuntimeError("Set ETH_RPC_URL in .env or pass --eth-rpc-url.")
            results[ticker.lower()] = monitor_target(args, ticker)
        except Exception as exc:
            results[ticker.lower()] = {
                "ticker": ticker,
                "error": str(exc),
            }

    print(json.dumps({"results": results}, indent=2))


if __name__ == "__main__":
    main()
