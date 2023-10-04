import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

import { AcalaEvmDatasource } from '@subql/acala-evm-processor';

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject<AcalaEvmDatasource> = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "acala-evm-starter",
  description:
    "A basic Acala EVM example",
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
      "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: [
      "wss://acala-polkadot.api.onfinality.io/public-ws",
      "wss://acala-rpc-0.aca-api.network",
    ],
    dictionary: 'https://explorer.subquery.network/subquery/subquery/acala-dictionary',
  },
  dataSources: [
    {
      kind: 'substrate/AcalaEvm',
      startBlock: 1000000,
      processor: {
        file: './node_modules/@subql/acala-evm-processor/dist/bundle.js',
        options: {
          abi: 'erc20',
          address: "0x0000000000000000000100000000000000000000" // ACA Token https://blockscout.acala.network/address/0x0000000000000000000100000000000000000000
        }
      },
      assets: {
        erc20: { file: './erc20.abi.json' },
      },
      mapping: {
        file: './dist/index.js',
        handlers: [
          {
            handler: 'handleAcalaEvmEvent',
            kind: 'substrate/AcalaEvmEvent',
            filter: {
              topics: [
                'Transfer(address indexed from,address indexed to,uint256 value)'
              ]
            }
          },
          {
            handler: 'handleAcalaEvmCall',
            kind: 'substrate/AcalaEvmCall',
            filter: {
              function: 'approve(address to,uint256 value)'
            }
          }
        ]
      },
    },
  ],
};

export default project;
