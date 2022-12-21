import type { OverrideBundleDefinition } from "@polkadot/types/types";

/* eslint-disable sort-keys */
const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        Address: "MultiAddress",
        LookupSource: "MultiAddress",
      },
    },
  ],
};

export default { typesBundle: { spec: { ajuna: definitions } } };
