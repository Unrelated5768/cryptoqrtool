from __future__ import annotations

from fastapi.testclient import TestClient

from wallet_api.app import app
from walletlib.store import WalletStore


TEST_MNEMONIC = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"


def client_for(tmp_path, monkeypatch):
    monkeypatch.setenv("BIP39_MNEMONIC", TEST_MNEMONIC)
    monkeypatch.setenv("ETH_RPC_URL", "http://eth-rpc.local")
    app.state.store = WalletStore(tmp_path / "wallet-api.sqlite3")
    return TestClient(app)


def test_health(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "reachable"}


def test_post_addresses_for_supported_bip39_tickers(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)
    requests = [
        {"ticker": "BTC", "label": "btc"},
        {"ticker": "ETH", "label": "eth"},
        {"ticker": "SOL", "label": "sol"},
        {"ticker": "USDC", "network": "ethereum", "label": "usdc-eth"},
        {"ticker": "USDT", "network": "solana", "label": "usdt-sol"},
    ]

    responses = [client.post("/addresses", json=payload) for payload in requests]

    assert [response.status_code for response in responses] == [201, 201, 201, 201, 201]
    btc, eth, sol, usdc, usdt = [response.json() for response in responses]
    assert btc["ticker"] == "BTC"
    assert btc["index"] == 0
    assert btc["address"].startswith("bc1")
    assert eth["address"].startswith("0x")
    assert sol["path"] == "m/44'/501'/0'/0/0"
    assert usdc["network"] == "ethereum"
    assert usdc["contract"].startswith("0x")
    assert usdt["network"] == "solana"
    assert "associated_token_account" in usdt


def test_usdc_defaults_to_ethereum(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)

    response = client.post("/addresses", json={"ticker": "USDC"})

    assert response.status_code == 201
    assert response.json()["network"] == "ethereum"


def test_address_listing_and_fetch(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)
    created = client.post("/addresses", json={"ticker": "BTC", "label": "customer"}).json()

    listing = client.get("/addresses", params={"ticker": "BTC"}).json()
    fetched = client.get(f"/addresses/{created['id']}").json()

    assert listing["addresses"][0]["id"] == created["id"]
    assert fetched["label"] == "customer"


def test_validation_errors_are_400(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)

    unsupported = client.post("/addresses", json={"ticker": "DOGE"})
    bad_network = client.post("/addresses", json={"ticker": "USDC", "network": "polygon"})
    native_network = client.post("/addresses", json={"ticker": "BTC", "network": "ethereum"})

    assert unsupported.status_code == 400
    assert bad_network.status_code == 400
    assert native_network.status_code == 400


def test_monitor_with_address_id_uses_persisted_metadata(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)
    created = client.post(
        "/addresses",
        json={"ticker": "USDT", "network": "solana", "label": "token"},
    ).json()

    def fake_monitor_spl_token(ticker, token_account, rpc_url, limit):
        return {
            "ticker": ticker,
            "network": "solana",
            "associated_token_account": token_account,
            "balance": "12.3",
            "received": [],
        }

    monkeypatch.setattr("walletlib.monitoring.monitor_spl_token", fake_monitor_spl_token)
    response = client.get(
        "/monitor",
        params={"ticker": "USDT", "address_id": created["id"], "limit": 5},
    )

    assert response.status_code == 200
    assert response.json()["associated_token_account"] == created["associated_token_account"]


def test_monitor_explicit_address_is_mockable(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)

    def fake_monitor_eth(address, rpc_url):
        return {"ticker": "ETH", "address": address, "balance": "1", "received": []}

    monkeypatch.setattr("walletlib.monitoring.monitor_eth", fake_monitor_eth)
    response = client.get(
        "/monitor",
        params={"ticker": "ETH", "address": "0x0000000000000000000000000000000000000001"},
    )

    assert response.status_code == 200
    assert response.json()["balance"] == "1"


def test_xmr_allocation_and_monitor_are_mocked(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)

    def fake_create_or_open(args):
        return {
            "subaddress": "89xmr-subaddress",
            "address_index": 7,
            "primary_address": "89xmr-primary",
            "wallet_name": args.xmr_wallet_name,
            "note": "mocked",
        }

    def fake_monitor_xmr(args):
        return {"ticker": "XMR", "balance": "0", "received": [], "source": args.xmr_rpc_url}

    monkeypatch.setattr("walletlib.allocation.create_or_open_monero_wallet", fake_create_or_open)
    monkeypatch.setattr("walletlib.monitoring.monitor_xmr", fake_monitor_xmr)
    monkeypatch.delenv("XMR_WALLET_RPC_URL", raising=False)

    created = client.post("/addresses", json={"ticker": "XMR", "label": "xmr"}).json()
    monitored = client.get("/monitor", params={"ticker": "XMR", "address_id": created["id"]})

    assert created["address"] == "89xmr-subaddress"
    assert created["address_index"] == 7
    assert created["wallet_name"] == "cryptoqr"
    assert monitored.status_code == 200
    assert monitored.json()["ticker"] == "XMR"
    assert monitored.json()["source"] == "http://monero-wallet-rpc:18083"


def test_xmr_missing_wallet_password_is_400(tmp_path, monkeypatch):
    client = client_for(tmp_path, monkeypatch)
    monkeypatch.delenv("XMR_NEW_WALLET_PASSWORD", raising=False)

    response = client.post("/addresses", json={"ticker": "XMR", "label": "xmr"})

    assert response.status_code == 400
    assert "XMR_NEW_WALLET_PASSWORD" in response.json()["detail"]["message"]
