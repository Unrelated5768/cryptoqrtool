from __future__ import annotations

from walletlib.store import WalletStore


def test_allocate_index_is_scoped_by_ticker_and_network(tmp_path):
    store = WalletStore(tmp_path / "wallet-api.sqlite3")

    assert store.allocate_index("BTC", None) == 0
    assert store.allocate_index("BTC", None) == 1
    assert store.allocate_index("USDC", "ethereum") == 0
    assert store.allocate_index("USDC", "solana") == 0
    assert store.allocate_index("USDC", "ethereum") == 1


def test_insert_and_list_addresses(tmp_path):
    store = WalletStore(tmp_path / "wallet-api.sqlite3")
    record = store.insert_address(
        ticker="ETH",
        network=None,
        label="customer-1",
        derivation_index=3,
        metadata={"ticker": "ETH", "index": 3, "address": "0xabc"},
    )

    assert record["id"] == 1
    assert store.get_address(1)["metadata"]["address"] == "0xabc"
    assert store.list_addresses(ticker="ETH", limit=10)[0]["label"] == "customer-1"
