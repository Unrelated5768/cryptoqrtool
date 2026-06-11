from __future__ import annotations

import os
from typing import Annotated, Any

import requests
from fastapi import Depends, FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

from create_wallets import load_local_env
from walletlib.allocation import (
    TOKEN_TICKERS,
    AddressValidationError,
    allocate_address,
    normalize_network,
    normalize_ticker,
)
from walletlib.monitoring import monitor_explicit_address, monitor_record
from walletlib.store import WalletStore


load_local_env()

app = FastAPI(title="CryptoQR Wallet API", version="1.0.0")


class AddressCreate(BaseModel):
    ticker: str = Field(..., examples=["BTC"])
    network: str | None = None
    label: str | None = None


def db_path() -> str:
    return os.getenv("WALLET_API_DB", "out/wallet-api.sqlite3")


def get_store() -> WalletStore:
    return getattr(app.state, "store", WalletStore(db_path()))


def flatten_record(record: dict[str, Any]) -> dict[str, Any]:
    metadata = dict(record.get("metadata") or {})
    response = {
        "id": record["id"],
        "ticker": record["ticker"],
        "network": record.get("network"),
        "label": record.get("label"),
        "derivation_index": record.get("derivation_index"),
        "address": record.get("address"),
        "created_at": record.get("created_at"),
        "metadata": metadata,
    }
    for key, value in metadata.items():
        response.setdefault(key, value)
    return response


def sanitized_upstream_error(exc: Exception) -> HTTPException:
    return HTTPException(
        status_code=502,
        detail={
            "error": "upstream_rpc_failed",
            "message": "Wallet, explorer, or chain RPC request failed.",
        },
    )


@app.get("/health")
def health(store: Annotated[WalletStore, Depends(get_store)]) -> dict[str, Any]:
    try:
        store.is_reachable()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "database": "unreachable", "message": str(exc)},
        ) from exc
    return {"status": "ok", "database": "reachable"}


@app.post("/addresses", status_code=201)
def create_address(
    request: AddressCreate,
    store: Annotated[WalletStore, Depends(get_store)],
) -> dict[str, Any]:
    try:
        ticker = normalize_ticker(request.ticker)
        network = normalize_network(ticker, request.network)
        record = allocate_address(
            store=store,
            ticker=ticker,
            network=network,
            label=request.label,
            mnemonic=os.getenv("BIP39_MNEMONIC"),
            xmr_rpc_url=os.getenv("XMR_WALLET_RPC_URL", "http://monero-wallet-rpc:18083"),
            xmr_rpc_user=os.getenv("MONERO_WALLET_RPC_USER"),
            xmr_rpc_password=os.getenv("MONERO_WALLET_RPC_PASSWORD"),
            xmr_wallet_name=os.getenv("XMR_WALLET_NAME", "cryptoqr"),
            xmr_wallet_password=os.getenv("XMR_NEW_WALLET_PASSWORD"),
        )
        return flatten_record(record)
    except AddressValidationError as exc:
        raise HTTPException(status_code=400, detail={"error": "invalid_request", "message": str(exc)}) from exc
    except requests.RequestException as exc:
        raise sanitized_upstream_error(exc) from exc
    except RuntimeError as exc:
        raise sanitized_upstream_error(exc) from exc


@app.get("/addresses")
def list_addresses(
    store: Annotated[WalletStore, Depends(get_store)],
    ticker: str | None = None,
    network: str | None = None,
    limit: Annotated[int, Query(ge=1, le=500)] = 100,
) -> dict[str, Any]:
    try:
        normalized_ticker = normalize_ticker(ticker) if ticker else None
        if network is not None and network not in {"ethereum", "solana"}:
            raise AddressValidationError("network must be ethereum or solana")
        if network is not None and normalized_ticker and normalized_ticker not in TOKEN_TICKERS:
            raise AddressValidationError("network filter only applies to USDC/USDT records")
        records = store.list_addresses(ticker=normalized_ticker, network=network, limit=limit)
        return {"addresses": [flatten_record(record) for record in records]}
    except AddressValidationError as exc:
        raise HTTPException(status_code=400, detail={"error": "invalid_request", "message": str(exc)}) from exc


@app.get("/addresses/{address_id}")
def get_address(
    address_id: int,
    store: Annotated[WalletStore, Depends(get_store)],
) -> dict[str, Any]:
    record = store.get_address(address_id)
    if record is None:
        raise HTTPException(status_code=404, detail={"error": "not_found", "message": "Address not found."})
    return flatten_record(record)


@app.get("/monitor")
def monitor(
    store: Annotated[WalletStore, Depends(get_store)],
    ticker: str,
    address_id: int | None = None,
    address: str | None = None,
    network: str | None = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
) -> dict[str, Any]:
    try:
        normalized_ticker = normalize_ticker(ticker)
        if address_id is not None:
            record = store.get_address(address_id)
            if record is None:
                raise HTTPException(
                    status_code=404,
                    detail={"error": "not_found", "message": "Address not found."},
                )
            if record["ticker"] != normalized_ticker:
                raise AddressValidationError("ticker does not match address_id record")
            return monitor_record(record=record, network=network, limit=limit)
        return monitor_explicit_address(
            ticker=normalized_ticker,
            address=address,
            network=network,
            limit=limit,
        )
    except HTTPException:
        raise
    except AddressValidationError as exc:
        raise HTTPException(status_code=400, detail={"error": "invalid_request", "message": str(exc)}) from exc
    except requests.RequestException as exc:
        raise sanitized_upstream_error(exc) from exc
    except RuntimeError as exc:
        raise sanitized_upstream_error(exc) from exc
