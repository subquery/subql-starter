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
  name: "humanode-starter",
  description: `This project can be used as a starting point for developing your SubQuery project. It indexes all transfers, bioauthentication events, and online validator nodes from Humanode chain. Moreover, it indexes the approvals and transfers of HMND token.`,
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
      "0xc56fa32442b2dad76f214b3ae07998e4ca09736e4813724bfb0717caae2c8bee",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["wss://explorer-rpc-ws.mainnet.stages.humanode.io"],
  },
  dataSources: [
    {
      kind: "substrate/FrontierEvm",
      startBlock: 1,
      processor: {
        file: "./node_modules/@subql/frontier-evm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          address: "0x0000000000000000000000000000000000000802", // A specific contract to index
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
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleBioauthNewAuthenticationEvent",
            filter: {
              module: "bioauth",
              method: "NewAuthentication",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleImonlineSomeOfflineEvent",
            filter: {
              module: "imOnline",
              method: "SomeOffline",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
