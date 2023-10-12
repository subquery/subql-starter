import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "kilt-spiritnet-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project. It aggregates attestations from the Kilt Spiritnet network",
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
      "0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: ["wss://spiritnet.api.onfinality.io/public-ws", "wss://spiritnet.kilt.io"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    dictionary: "https://api.subquery.network/sq/subquery/kilt-spiritnet-dictionary",
    chaintypes: {
      file: './dist/chaintypes.js'
    }
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
            handler: "handleAttestationCreated",
            filter: {
              module: "attestation",
              method: "AttestationCreated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleAttestationRevoked",
            filter: {
              module: "attestation",
              method: "AttestationRevoked",
            },
          },
          // We could not find any events for this module in the blocks explored
          /*{
            kind: SubstrateHandlerKind.Event,
            handler: "handleAttestationRemoved",
            filter: {
              module: "attestation",
              method: "AttestationRemoved",
            },
          },*/
        ],
      },
    },
  ],
};

export default project;
