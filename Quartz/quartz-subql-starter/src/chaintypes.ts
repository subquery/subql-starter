import type { OverrideBundleDefinition } from "@polkadot/types/types";

import { unique } from "@unique-nft/types/definitions";

export default {
    typesBundle: {
        rpc: { unique: unique.rpc },
    } as OverrideBundleDefinition,
};
