# SubQuery - Example Project for Humanode

[SubQuery](https://subquery.network) is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across all of our supported networks. To learn about how to get started with SubQuery, [visit our docs](https://academy.subquery.network).

This project can be used as a starting point for developing your SubQuery project. It indexes all transfers, bioauthentication events, and online validator nodes from Humanode chain. Moreover, it indexes the approvals and transfers of HMND token.

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
3.  `docker-compose pull && docker-compose up` - Runs a Docker container with an indexer, PostgeSQL DB, and a query service. This requires [Docker to be installed](https://docs.docker.com/engine/install) and running locally. The configuration for this container is set from your `docker-compose.yml`

You can observe the three services start, and once all are running (it may take a few minutes on your first start), please open your browser and head to [http://localhost:3000](http://localhost:3000) - you should see a GraphQL playground showing with the schemas ready to query. [Read the docs for more information](https://academy.subquery.network/run_publish/run.html) or [explore the possible service configuration for running SubQuery](https://academy.subquery.network/run_publish/references.html).

## Query your project

For this project, you can try to query with the following GraphQL code to get a taste of how it works.

```graphql
{
  query {
    transactions(first: 1, orderBy: VALUE_DESC) {
      totalCount
      nodes {
        id
        transactionHash
        blockHeight
        from
        to
        value
        contractAddress
      }
    }
  }
  approvals(first: 1) {
    nodes {
      id
      owner
      spender
      value
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
```

Afterward, anticipate receiving a result resembling this:

```json
{
  "data": {
    "query": {
      "transactions": {
        "nodes": [
          {
            "id": "7487952-0x030d4ab19a9fa75e093bcbc400f1a10a6e377e52f673bfd1cd490572e9874282-0",
            "transactionHash": "0x030d4ab19a9fa75e093bcbc400f1a10a6e377e52f673bfd1cd490572e9874282",
            "blockHeight": "7487952",
            "from": "0xf591da380c911C7bE9Ba48bD14c451bF784886F7",
            "to": "0xe48Cc340B8f1AC0a326577B3c2d1Fe5229ebb1c2",
            "value": "9800000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000000802"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x909a9c2d5eead83eeba78f8b4cfd789cf1b2fcfc543a33b63a792fe4a8a53b37",
          "owner": "0xd5b2bceeaaaccb2bf152207f7e8c4abcaa7d5881",
          "spender": "0x8C20a3F5C9A5926d4C83592c25317f602b385441",
          "value": "100000000000000000000",
          "contractAddress": "0x0000000000000000000000000000000000000802"
        }
      ]
    },
    "bioauthNewAuthentications": {
      "nodes": [
        {
          "id": "7489527-1",
          "validatorPublicKey": "hmsxpGvLUfSbUZxUYFZF9dNm3Jf9xUBdhN1p229qAr4xiktFP",
          "timestamp": "2024-04-26T13:34:18",
          "blockNumber": 7489527
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

SubQuery is open-source, meaning you have the freedom to run it in the following three ways:

- Locally on your own computer (or a cloud provider of your choosing), [view the instructions on how to run SubQuery Locally](https://academy.subquery.network/run_publish/run.html)
- By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Find out how](https://academy.subquery.network/run_publish/publish.html)
- [Coming Soon] By publishing it to the decentralised [SubQuery Network](https://subquery.network/network), the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way

## What Next?

Take a look at some of our advanced features to take your project to the next level!

- [**Multi-chain indexing support**](https://academy.subquery.network/build/multi-chain.html) - SubQuery allows you to index data from across different layer-1 networks into the same database, this allows you to query a single endpoint to get data for all supported networks.
- [**Dynamic Data Sources**](https://academy.subquery.network/build/dynamicdatasources.html) - When you want to index factory contracts, for example on a DEX or generative NFT project.
- [**Project Optimisation Advice**](https://academy.subquery.network/build/optimisation.html) - Some common tips on how to tweak your project to maximise performance.
- [**GraphQL Subscriptions**](https://academy.subquery.network/run_publish/subscription.html) - Build more reactive front end applications that subscribe to changes in your SubQuery project.

## Need Help?

The fastest way to get support is by [searching our documentation](https://academy.subquery.network), or by [joining our discord](https://discord.com/invite/subquery) and messaging us in the `#technical-support` channel.
