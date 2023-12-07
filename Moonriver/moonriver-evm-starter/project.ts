import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

import { FrontierEvmDatasource } from "@subql/frontier-evm-processor";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject<FrontierEvmDatasource> = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "moonriver-evm-starter",
  description: `A basic Frontier EVM example project with an event and call handler. Read more
    about this at https://university.subquery.network/create/frontier/. This
    project can be use as a starting point for developing your SubQuery project`,
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId:
      "0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: [
      "wss://moonriver.api.onfinality.io/public-ws",
      "wss://wss.api.moonriver.moonbeam.network",
    ],
    chaintypes: {
      file: "./dist/chaintypes.js",
    },
  },
  dataSources: [
    {
      kind: "substrate/FrontierEvm",
      startBlock: 752073,
      processor: {
        file: "./node_modules/@subql/frontier-evm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          address: "0x6bd193ee6d2104f14f94e2ca6efefae561a4334b", // Solarbeam token https://moonriver.moonscan.io/address/0x6bd193ee6d2104f14f94e2ca6efefae561a4334b
        },
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvmEvent",
            kind: "substrate/FrontierEvmEvent",
            filter: {
              topics: [
                "Transfer(address indexed from,address indexed to,uint256 value)",
              ],
            },
          },
          {
            handler: "handleEvmCall",
            kind: "substrate/FrontierEvmCall",
            filter: {
              function: "approve(address to,uint256 value)",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
