import type { OverrideBundleDefinition } from "@polkadot/types/types";

import { versionedKhala } from "@phala/typedefs";

export default {
  typesBundle: { ...versionedKhala } as OverrideBundleDefinition,
};
