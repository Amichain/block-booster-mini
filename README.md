# Amichain BlockBooster mini

A (very) lightweight script designed to speed up transaction confirmations on Avalanche L1's.

## Motivation

On newly created Avalanche L1 blockchains, the Snowman consensus protocol optimizes block generation by waiting for new transactions.

If the transaction rate is low, confirmation times can be slow and may cause affected dApps to become stuck.

This script addresses this by sending a dummy transaction (0 value to the zero address) whenever a new block is detected, forcing faster block creation and enabling sub-second transaction confirmations.

## Features

- Detect new block emission on a targeted chain.
- Send a dummy transaction (0 value to zero address).

## Usage

Clone repo
```
git clone https://github.com/Amichain/block-booster-mini
```

Install with npm
```
cd block-booster-mini
npm i
```

Setup environment variables
> [!WARNING]
> The websocket RPC Url should not be rate limited.

> The first wallet derived from the seed must hold native tokens to cover transaction fees.
```
WEBSOCKET_RPC=wss://testnet-ws.amichain.org
SEED="your seed phrase here"
```

Start the script
```
npm run start
```