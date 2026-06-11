# CryptoQR Headless Wallet Stack

This is a starter stack for generating receive addresses and monitoring them from Linux without a GUI.

It deliberately keeps heavy chain infrastructure limited:

- BTC and LTC run pruned local nodes.
- XMR runs `monero-wallet-rpc` against Cake Wallet's public remote node by default.
- ETH and SOL use provider RPC URLs by default.
- USDC and USDT are monitored as tokens, not separate wallets.

## Start

```sh
cd wallet-stack
./generate-env.sh
docker compose up -d bitcoin litecoin monero-wallet-rpc
```

`generate-env.sh` writes `.env` with random local RPC passwords and file mode `600`.
It refuses to overwrite an existing `.env` unless you run:

```sh
OVERWRITE_ENV=1 ./generate-env.sh
```

Wait for the nodes you use to sync. BTC/LTC may take time even in pruned mode.

The default Monero daemon address is `xmr-node.cakewallet.com:18081`. Cake's docs
describe custom node settings as host, port, optional login/password, and SSL
selection; the common Monero ports are `18081` and `18089`.

## Generate Receive Addresses With uv

Run the helper locally with `uv`:

```sh
uv run tools/create_wallets.py
```

When run from `wallet-stack`, the script loads local settings from `.env`. If
`BIP39_MNEMONIC` is not set yet, it generates one and writes it to `.env` with
file mode `600`, so `tools/new_address.py` can derive future receive addresses
without more setup.

That writes `wallet-stack/out/wallet-addresses.json` and prints:

- BTC native SegWit receive address
- LTC native SegWit receive address
- ETH address
- SOL owner address
- Ethereum USDC/USDT contract watch metadata
- Solana USDC/USDT associated token accounts

If you need to print the generated BIP-39 mnemonic for offline backup, run:

```sh
uv run tools/create_wallets.py --print-secrets
```

Store the mnemonic offline. The script does not print it by default.

Generate the next address from the same seed:

```sh
uv run tools/create_wallets.py \
  --mnemonic "word1 word2 ... word24" \
  --index 1 \
  --label customer-1
```

You can also run the helper through Docker:

```sh
docker compose --profile tools run --rm wallet-tools --print-secrets
```

## Request One New Address

After first bootstrap, put your BIP-39 mnemonic in `.env` as `BIP39_MNEMONIC`
or pass it with `--mnemonic`. Then request a new address by ticker:

```sh
uv run tools/new_address.py BTC --label customer-42
uv run tools/new_address.py LTC --label customer-42
uv run tools/new_address.py ETH --label customer-42
uv run tools/new_address.py SOL --label customer-42
```

For token tickers, choose the chain:

```sh
uv run tools/new_address.py USDC --network ethereum --label customer-42
uv run tools/new_address.py USDT --network solana --label customer-42
```

The script stores derivation counters in `out/address-state.json` and an address
history in `out/address-history.json`.

For Monero, start `monero-wallet-rpc` first, then request a subaddress:

```sh
XMR_NEW_WALLET_PASSWORD='change_me_wallet_password' \
uv run tools/new_address.py XMR --label customer-42
```

## Check Balance And Last Receipts

Use `monitor.py` to query public explorer APIs, configured RPCs, or
`monero-wallet-rpc`:

```sh
uv run tools/monitor.py
uv run tools/monitor.py BTC bc1...
uv run tools/monitor.py LTC ltc1...
uv run tools/monitor.py SOL 3zr...
uv run tools/monitor.py XMR
```

If you omit the ticker, it checks all supported tickers using the latest matching
entries from `out/address-history.json`. If you omit only the address, it uses
the latest matching entry from
`out/address-history.json`:

```sh
uv run tools/monitor.py BTC --limit 5
uv run tools/monitor.py USDT --network solana --limit 5
```

ETH and Ethereum-token balances use `ETH_RPC_URL`. Native ETH transaction
history needs an indexer; plain JSON-RPC does not enumerate account history.
For ERC-20 receipt scanning, set `MONITOR_ETH_FROM_BLOCK` to a bounded starting
block before running `USDC` or `USDT` on Ethereum.

## Include Monero

Monero does not work like BTC/ETH. A public XMR address alone is not enough for monitoring. You need a wallet file/view key, and this stack uses `monero-wallet-rpc`.

Create/open the Monero wallet and generate a subaddress:

```sh
uv run tools/create_wallets.py \
  --include-xmr \
  --generate-xmr-wallet-password \
  --xmr-rpc-url http://127.0.0.1:18083 \
  --xmr-wallet-name cryptoqr \
  --label customer-0
```

`--generate-xmr-wallet-password` creates and stores `XMR_NEW_WALLET_PASSWORD` in
`.env` if it is missing.

If you need to back up the Monero seed during first bootstrap:

```sh
XMR_NEW_WALLET_PASSWORD='change_me_wallet_password' \
uv run tools/create_wallets.py \
  --include-xmr \
  --xmr-rpc-url http://127.0.0.1:18083 \
  --print-secrets
```

## Optional Local Monero Node

If you do not want to rely on Cake's remote node, switch `.env` to:

```sh
MONERO_DAEMON_ADDRESS=monerod:18081
```

Then start the local pruned node profile:

```sh
docker compose --profile local-monero up -d monerod monero-wallet-rpc
```

## Monitoring Shape

Use the generated JSON as the source of watched addresses:

- BTC: import address/descriptors into Bitcoin Core or index with an external service.
- LTC: same pattern with Litecoin Core.
- ETH: poll balance and watch ERC-20 `Transfer` logs for USDC/USDT contracts.
- SOL: poll owner balance, signatures, and associated token accounts.
- XMR: query `monero-wallet-rpc` for incoming transfers and subaddress balances. The wallet RPC can use Cake's remote node or your local `monerod`.

## Production Notes

Pin Docker image digests before production. The image tags here are intentionally readable for a draft.

Do not expose node RPC ports publicly. Compose binds them to `127.0.0.1`.

Do not store spend keys or mnemonics in the app database. Store watch-only metadata wherever possible.
