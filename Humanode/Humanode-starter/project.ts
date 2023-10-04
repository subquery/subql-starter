import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "humanode-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project. It indexes all transfers, bioauthentication events, and online validator nodes from Humanode chain",
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
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: ["wss://explorer-rpc-ws.mainnet.stages.humanode.io"],
  },
  dataSources: [
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

export default project;
