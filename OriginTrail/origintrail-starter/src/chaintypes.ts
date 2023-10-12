import type { OverrideBundleDefinition } from "@polkadot/types/types";

/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        Address: "AccountId",
        LookupSource: "AccountId",
      },
    },
  ],
};

export default { typesBundle: { spec: { origintrail: definitions } } };
