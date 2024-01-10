import type { OverrideBundleDefinition } from "@polkadot/types/types";

import * as typeDefs from "@zeitgeistpm/type-defs";

import { typesFromDefs } from "./utils";

const bundle = {
  alias: {
    tokens: {
      AccountData: "TokensAccountData",
    },
  },
  types: [
    {
      minmax: [0, undefined],
      types: {
        // the cast here is needed to make the build happy,
        // however the output is actually correct as well...
        ...typesFromDefs(
          typeDefs as unknown as Record<string, { types: Record<string, any> }>
        ),
        TokensAccountData: {
          free: "Balance",
          frozen: "Balance",
          reserved: "Balance",
        },
      },
    },
  ],
};

export default bundle as never as OverrideBundleDefinition;
