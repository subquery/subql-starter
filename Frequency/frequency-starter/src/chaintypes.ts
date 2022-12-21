import type { OverrideBundleDefinition } from "@polkadot/types/types";
import { options } from "@frequency-chain/api-augment";

/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  ...options,
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: options.types,
    },
  ],
};

export default { typesBundle: { spec: { frequency: { definitions } } } };
