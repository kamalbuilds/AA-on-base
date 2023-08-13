# Account Abstraction on Base Gorelli + 5 Chains

[The Safe{Core} SDK](https://github.com/safe-global/safe-core-sdk) allows builders to add account abstraction functionality into our App. 
See the [Safe{Core} Account Abstraction SDK Docs](https://docs.safe.global/learn/safe-core-account-abstraction-sdk) for more details.

![base](https://github.com/kamalbuilds/AA-on-base/assets/95926324/36ff37c8-1ca1-49b2-9cb9-cf1798cbcd29)

## How We are doing this ? We are relaying the transaction for our DAO Members those who have the membership NFT.
```
  async relayTransaction({
    target,
    encodedTransaction,
    chainId,
    options
  }: RelayTransaction): Promise<RelayResponse> {
    const response = options.isSponsored
      ? this.sendSponsorTransaction(target, encodedTransaction, chainId)
      : this.sendSyncTransaction(target, encodedTransaction, chainId, options)
    return response
  }
```

## Installation

To run this project locally:

Install deps:

```bash
yarn install
```

Create a `.env` file (see `example.env`)

```
# see https://web3auth.io/docs/developer-dashboard/get-client-id
REACT_APP_WEB3AUTH_CLIENT_ID=

REACT_APP_STRIPE_BACKEND_BASE_URL=https://aa-stripe.safe.global

REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO

```

Run the App:

```bash
yarn start
```
