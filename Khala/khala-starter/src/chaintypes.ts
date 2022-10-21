import type { OverrideBundleType } from "@polkadot/types/types";
import { versionedKhala } from "@phala/typedefs";

const typeBundleForPolkadot = {
  spec: {
    khala: {
      alias: {},
      rpc: {},
      types: versionedKhala,
    },
  },
} as unknown as OverrideBundleType;

export default { typesBundle: typeBundleForPolkadot };
