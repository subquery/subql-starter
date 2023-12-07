import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

import { WasmDatasource } from "@subql/substrate-wasm-processor";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject<WasmDatasource> = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "polkadot-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project",
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
    endpoint: ["astar.api.onfinality.io/public", "wss://rpc.astar.network"],
  },
  dataSources: [
    {
      // This is the datasource for Astar's Native Substrate processor
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 87073,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleNewContract",
            filter: {
              module: "dappsStaking",
              method: "NewContract",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleBondAndStake",
            filter: {
              module: "dappsStaking",
              method: "BondAndStake",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleUnbondAndUnstake",
            filter: {
              module: "dappsStaking",
              method: "UnbondAndUnstake",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleReward",
            filter: {
              module: "dappsStaking",
              method: "Reward",
            },
          },
        ],
      },
    },
    {
      // This is the datasource for Astar's Wasm processor
      kind: "substrate/Wasm",
      startBlock: 3281780,
      processor: {
        file: "./node_modules/@subql/substrate-wasm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          // contract: "a6Yrf6jAPUwjoi5YvvoTE4ES5vYAMpV55ZCsFHtwMFPDx7H" // Shibuya
          contract: "bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc", // Mainnet,
        },
      },
      assets: new Map([["erc20", { file: "./abis/erc20Metadata.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleWasmEvent",
            kind: "substrate/WasmEvent",
            filter: {
              // contract: "a6Yrf6jAPUwjoi5YvvoTE4ES5vYAMpV55ZCsFHtwMFPDx7H" // Shibuya
              contract: "bZ2uiFGTLcYyP8F88XzXa13xu5Mmp13VLiaW1gGn7rzxktc", // Mainnet
              identifier: "Transfer",
            },
          },
          {
            handler: "handleWasmCall",
            kind: "substrate/WasmCall",
            filter: {
              selector: "0x681266a0",
              method: "approve",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
