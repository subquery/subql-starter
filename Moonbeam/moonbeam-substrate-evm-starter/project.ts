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
  name: "moonbeam-substrate-evm-starter",
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
      "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [
      "wss://moonbeam.api.onfinality.io/public-ws",
      "wss://wss.api.moonbeam.network",
    ],
    chaintypes: {
      file: "./dist/chaintypes.js",
    },
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleCollatorJoined",
            kind: SubstrateHandlerKind.Call,
            filter: {
              module: "staking",
              method: "joinCandidates",
            },
          },
          {
            handler: "handleCollatorLeft",
            kind: SubstrateHandlerKind.Call,
            filter: {
              module: "staking",
              method: "executeLeaveCandidates",
            },
          },
        ],
      },
    },
    {
      kind: "substrate/FrontierEvm",
      startBlock: 189831,
      processor: {
        file: "./node_modules/@subql/frontier-evm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          // Contract address of $FRAX
          address: "0x322E86852e492a7Ee17f28a78c663da38FB33bfb",
        },
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleErc20Transfer",
            kind: "substrate/FrontierEvmEvent",
            filter: {
              topics: [
                "Transfer(address indexed from,address indexed to,uint256 value)",
              ],
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
