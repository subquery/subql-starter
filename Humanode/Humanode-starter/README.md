# SubQuery - Example Project for Humanode

[SubQuery](https://subquery.network) is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported networks. To learn about how to get started with SubQuery, [visit our docs](https://academy.subquery.network).

**This project can be used as a starting point for developing your SubQuery project. It indexes all transfers, bioauthentication events, and online validator nodes from Humanode chain. Moreover, it indexes the approvals and transfers of HMND token.**

**In order to index both Substrate and EVM, we run this as a [multi-chain project](https://academy.subquery.network/build/multi-chain.html). You may decide to delete one manifest (`.yaml`) file in order to run this as a single chain project.**

## Start

First, install SubQuery CLI globally on your terminal by using NPM `npm install -g @subql/cli`

You can either clone this GitHub repo, or use the `subql` CLI to bootstrap a clean project in the network of your choosing by running `subql init` and following the prompts.

Don't forget to install dependencies with `npm install` or `yarn install`!

## Editing your SubQuery project

Although this is a working example SubQuery project, you can edit the SubQuery project by changing the following files:

- The project manifest in `project.yaml` defines the key project configuration and mapping handler filters
- The GraphQL Schema (`schema.graphql`) defines the shape of the resulting data that you are using SubQuery to index
- The Mapping functions in `src/mappings/` directory are typescript functions that handle transformation logic

SubQuery supports various layer-1 blockchain networks and provides [dedicated quick start guides](https://academy.subquery.network/quickstart/quickstart.html) as well as [detailed technical documentation](https://academy.subquery.network/build/introduction.html) for each of them.

## Run your project

_If you get stuck, find out how to get help below._

The simplest way to run your project is by running `yarn dev` or `npm run-script dev`. This does all of the following:

1.  `yarn codegen` - Generates types from the GraphQL schema definition and contract ABIs and saves them in the `/src/types` directory. This must be done after each change to the `schema.graphql` file or the contract ABIs
2.  `yarn build` - Builds and packages the SubQuery project into the `/dist` directory
3.  `docker compose pull && docker compose up` - Runs a Docker container with an indexer, PostgeSQL DB, and a query service. This requires [Docker to be installed](https://docs.docker.com/engine/install) and running locally. The configuration for this container is set from your `docker-compose.yml`

You can observe the three services start, and once all are running (it may take a few minutes on your first start), please open your browser and head to [http://localhost:3000](http://localhost:3000) - you should see a GraphQL playground showing with the schemas ready to query. [Read the docs for more information](https://academy.subquery.network/run_publish/run.html) or [explore the possible service configuration for running SubQuery](https://academy.subquery.network/run_publish/references.html).

## Query your project

For this project, you can try to query with the following GraphQL code to get a taste of how it works.

```graphql
{
  query {
    eRC20TokenTransfers(first: 3) {
      nodes {
        id
        from
        to
        value
        contractAddress
      }
    }
    eRC20Approvals(first: 3) {
      nodes {
        id
        value
        owner
        spender
        contractAddress
      }
    }
    bioauthNewAuthentications(first: 1) {
      nodes {
        id
        validatorPublicKey
        timestamp
        blockNumber
      }
    }
    imOnlineSomeOfflines(first: 1) {
      nodes {
        id
        accountIds
        timestamp
        blockNumber
      }
    }
  }
}
```

Afterward, anticipate receiving a result resembling this:

```json
{
  "data": {
    "query": {
      "eRC20TokenTransfers": {
        "nodes": [
          {
            "id": "0x1272f33847946221216ba1cb4ce9171ea0da551780ab632988e5b2f7a65d6ff6",
            "from": "0x8C20a3F5C9A5926d4C83592c25317f602b385441",
            "to": "0xF52838e033a20295b69F8fBf75b00E0E5a482b4b",
            "value": "1000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000000802"
          },
          {
            "id": "0x581084e04b4d939db3c1cb5dc2b009c4755a73af0b8929fe9eb3a24c7a1eddaa",
            "from": "0x8C20a3F5C9A5926d4C83592c25317f602b385441",
            "to": "0xF52838e033a20295b69F8fBf75b00E0E5a482b4b",
            "value": "5499999999999999725",
            "contractAddress": "0x0000000000000000000000000000000000000802"
          },
          {
            "id": "0x60590c52429ecec6145a801622cea200e9454eb79d2ebf229bcf59c2e3c7c21a",
            "from": "0x8C20a3F5C9A5926d4C83592c25317f602b385441",
            "to": "0xF52838e033a20295b69F8fBf75b00E0E5a482b4b",
            "value": "10000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000000802"
          }
        ]
      },
      "eRC20Approvals": {
        "nodes": [
          {
            "id": "0x5fbb64a3341b2abf82cbaf89ba2f0d1855803852dd7ead903fd979a4a765b4d6",
            "value": "194067188645000000000",
            "owner": "0xF52838e033a20295b69F8fBf75b00E0E5a482b4b",
            "spender": "0x8C20a3F5C9A5926d4C83592c25317f602b385441",
            "contractAddress": "0x0000000000000000000000000000000000000802"
          }
        ]
      },
      "bioauthNewAuthentications": {
        "nodes": [
          {
            "id": "4792181-1",
            "validatorPublicKey": "hmpRQiS4p7pPr44ibxr25kQ6VqgWGL7whRJ3xx2dsZDJSQ932",
            "timestamp": "2023-10-18T09:38:12",
            "blockNumber": 4792181
          }
        ]
      },
    "imOnlineSomeOfflines": {
      "nodes": [
        {
          "id": "7495265-0",
          "accountIds": [
            "hmrjcaAhyXhsZ37ndzTTv4BdUEVc8yw9xaNfp75oXzH3YGJgq",
            "hmqKroHLbyP9QfREyGT6X9D5AbHwCBnQw5bsrg99EirM6uPpk",
            "hmrrvsazEScvkVj1CJdewfxxP7bLz99fydDxSeLkKcHzYp6KY",
            "hmpt1bKjZfJBUQ8ZiGLvwJuxv7Fg2cKJMNxojDh7EE3RANHAA",
            "hmsbiRJYWozBFpHhzWyiHs99rDy88rMHCVRsN9mXxJBMVyKim",
            "hmq7RB5cu3GsVLfD4iUDC8LQmqhL8gmxLLLCbNw1geZa1pMRr",
            "hmqNahjGVaaNVZ3GsmyScgfQuWjsAJMyV5vRSBghVa1EkPKt2",
            "hmq6hEjFh5wu3zFa2ZNC8nunRhquhpxvTK96ph4jxTjnn9kdF",
            "hmpZ6medWcV9suYc4b98SRtVyYc4En7Mmx6kUSZBaaTH7SM9E",
            "hmrHE9bXxtse94j8FoqJLdQjVTAwwNxCuietpi84V2WwwpDVq",
            "hmpsTmnYR5qLik1FjCWVTkXH3NMu5qBmnb6BQaZjx6gETY29f",
            "hmrxbpsg1rnd75vt3vCpD3fTVEgrv5bCMwGqdRYfGmYMKa7K8",
            "hmqCBhZDc828ZtMkpDifdeNc1jSZMQBzPjQGpD7mekyKp7oh6",
            "hmpALuSfpMpFjXQPpDV2Sn4AW5qCM2JfJwugWxK7AtwYcVSXR",
            "hmp7QcaW8c1JCjqeFpX2aHE5146wtcVdca8WXeJx9Y5Vwx1uN",
            "hmrhDq3PCCNmpMWQDYhS9JNFDEcKSZBR5RJJmCEYv8Abnw5by",
            "hmokJ7UHP4in95tfqHMQpqL7rRL9hHAfHVFJrRxN987KmsEQY",
            "hmncjXyHh4j8z6YtvGTCs2G3ByBACWutpW9q56cvcp3cA5Uad",
            "hmrU6j8B5aUPLz78D5jzc9DhnWXb8ypYa5fBupascJAGk1LMw",
            "hmsBuGEC7XfkXV8bVXu6tULnDd9qa3U1gDTUbPCXREK8Yhdna",
            "hmsgV5aPxsZgschUS3owhB1RSvaq8PNw5pCUCdM3eCFNknuHq",
            "hmpXQ7k6gFzASRT2DVcQ62XjPMnL8DGQLEHns4Gxhv6EiD2TP",
            "hmnqeQT8J37tTp9L4ddSu35CgbaAgYf5oByHxjdTiopKmGt7X",
            "hmsRKiowVG6eU5SKNShU7YJW4UN5c8jPih27invvBFGWtvoPT",
            "hmoVBTcRevpKH8uZkrAhXLrn9RqAk59jhd7CHbGzoWWjMF2Fy",
            "hmpxeu6SBsXHCHja3mQGLPehDJkaRMsNZA4DAgfLDgxRPm98i",
            "hmoyMLtAh7HqUzJ2ZpKttAbDpGuUrAnH8N1kD4ZU9JukHGSap",
            "hmpbWVGtyAhJM8aKzovbWFioHUdEiN4PoWcwJBSbGyoRDmoia",
            "hmoLUKVnybkDEpEgAmmJLiAAxb8c1XV8AGtKoRHi9phd7gPhP",
            "hmt3Ge343U6svqMDgNJAaZM5RwtNYYjQhEVDPxNEByeoBgzcS",
            "hmqq7LR14c3U1hdwEigRZ2mV6VRtXVviBpjuqm9YUtiNdtfau",
            "hmpKz8z31bq17BC72wQNrDVNc8XeSJjucYT1dpfS1ocw2FXkV",
            "hmnrJ8M7XUZtGEVLnLbngi6XCwEwKgfUNfkRiyrqjP1iLpRj8",
            "hmrQRgz8pU3gT8cEn4XgsRtLUW8nxTtz4SCzXRx6GxdDEtXVF"
          ],
          "timestamp": "2024-04-26T23:32:54",
          "blockNumber": 7495265
        }
      ]
    }
  }
}
```

You can explore the different possible queries and entities to help you with GraphQL using the documentation draw on the right.

## Publish your project

SubQuery is open-source and designed to be easy to run, meaning you have the freedom to run it a variety of ways:

- [Locally on your own computer or on your cloud provider of choice.](https://academy.subquery.network/indexer/run_publish/introduction.html#locally-run-it-yourself)
- [By publishing it to the decentralised SubQuery Network](https://academy.subquery.network/indexer/run_publish/introduction.html#publish-to-the-subquery-network), the most open, performant, reliable, and scalable data service for dApp developers.
- [Leveraging a centralised hosting partner in the SubQuery community](https://academy.subquery.network/indexer/run_publish/introduction.html#other-hosting-providers-in-the-subquery-community), like OnFinality or Traceye.

## What Next?

Take a look at some of our advanced features to take your project to the next level!

- [**Multi-chain indexing support**](https://academy.subquery.network/build/multi-chain.html) - SubQuery allows you to index data from across different layer-1 networks into the same database, this allows you to query a single endpoint to get data for all supported networks.
- [**Dynamic Data Sources**](https://academy.subquery.network/build/dynamicdatasources.html) - When you want to index factory contracts, for example on a DEX or generative NFT project.
- [**Project Optimisation Advice**](https://academy.subquery.network/build/optimisation.html) - Some common tips on how to tweak your project to maximise performance.
- [**GraphQL Subscriptions**](https://academy.subquery.network/run_publish/subscription.html) - Build more reactive front end applications that subscribe to changes in your SubQuery project.

## Need Help?

The fastest way to get support is by [searching our documentation](https://academy.subquery.network), or by [joining our discord](https://discord.com/invite/subquery) and messaging us in the `#technical-support` channel.
