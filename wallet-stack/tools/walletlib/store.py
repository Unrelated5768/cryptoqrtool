from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator


SCHEMA = """
CREATE TABLE IF NOT EXISTS address_counters (
    ticker TEXT NOT NULL,
    network TEXT NOT NULL DEFAULT '',
    next_index INTEGER NOT NULL,
    PRIMARY KEY (ticker, network)
);

CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    network TEXT,
    label TEXT,
    derivation_index INTEGER,
    address TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    metadata_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_addresses_ticker_network_id
ON addresses (ticker, network, id);
"""


class WalletStore:
    def __init__(self, path: str | Path) -> None:
        self.path = Path(path)

    @contextmanager
    def connect(self) -> Iterator[sqlite3.Connection]:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        try:
            conn.executescript(SCHEMA)
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

    def is_reachable(self) -> bool:
        with self.connect() as conn:
            conn.execute("SELECT 1").fetchone()
        return True

    def allocate_index(self, ticker: str, network: str | None) -> int:
        ticker = ticker.upper()
        network_key = network or ""
        with self.connect() as conn:
            conn.execute("BEGIN IMMEDIATE")
            row = conn.execute(
                """
                SELECT next_index
                FROM address_counters
                WHERE ticker = ? AND network = ?
                """,
                (ticker, network_key),
            ).fetchone()
            if row is None:
                index = 0
                conn.execute(
                    """
                    INSERT INTO address_counters (ticker, network, next_index)
                    VALUES (?, ?, ?)
                    """,
                    (ticker, network_key, 1),
                )
            else:
                index = int(row["next_index"])
                conn.execute(
                    """
                    UPDATE address_counters
                    SET next_index = ?
                    WHERE ticker = ? AND network = ?
                    """,
                    (index + 1, ticker, network_key),
                )
            return index

    def insert_address(
        self,
        *,
        ticker: str,
        network: str | None,
        label: str | None,
        derivation_index: int | None,
        metadata: dict[str, Any],
    ) -> dict[str, Any]:
        address = primary_address(metadata)
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO addresses
                    (ticker, network, label, derivation_index, address, metadata_json)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    ticker.upper(),
                    network,
                    label,
                    derivation_index,
                    address,
                    json.dumps(metadata, sort_keys=True),
                ),
            )
            row = conn.execute(
                """
                SELECT id, ticker, network, label, derivation_index, address, created_at,
                       metadata_json
                FROM addresses
                WHERE id = ?
                """,
                (cursor.lastrowid,),
            ).fetchone()
            if row is None:
                raise RuntimeError("Inserted address record could not be read back.")
            return row_to_address(row)

    def get_address(self, address_id: int) -> dict[str, Any] | None:
        with self.connect() as conn:
            row = conn.execute(
                """
                SELECT id, ticker, network, label, derivation_index, address, created_at,
                       metadata_json
                FROM addresses
                WHERE id = ?
                """,
                (address_id,),
            ).fetchone()
            return row_to_address(row) if row else None

    def list_addresses(
        self,
        *,
        ticker: str | None = None,
        network: str | None = None,
        limit: int = 100,
    ) -> list[dict[str, Any]]:
        clauses: list[str] = []
        params: list[Any] = []
        if ticker:
            clauses.append("ticker = ?")
            params.append(ticker.upper())
        if network is not None:
            clauses.append("network = ?")
            params.append(network)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        params.append(limit)
        with self.connect() as conn:
            rows = conn.execute(
                f"""
                SELECT id, ticker, network, label, derivation_index, address, created_at,
                       metadata_json
                FROM addresses
                {where}
                ORDER BY id DESC
                LIMIT ?
                """,
                params,
            ).fetchall()
            return [row_to_address(row) for row in rows]


def primary_address(metadata: dict[str, Any]) -> str | None:
    for key in ("address", "associated_token_account", "owner_address", "subaddress"):
        value = metadata.get(key)
        if isinstance(value, str):
            return value
    return None


def row_to_address(row: sqlite3.Row) -> dict[str, Any]:
    metadata = json.loads(row["metadata_json"])
    return {
        "id": row["id"],
        "ticker": row["ticker"],
        "network": row["network"],
        "label": row["label"],
        "derivation_index": row["derivation_index"],
        "address": row["address"],
        "created_at": row["created_at"],
        "metadata": metadata,
    }
