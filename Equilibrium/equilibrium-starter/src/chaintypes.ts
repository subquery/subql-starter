import type { OverrideBundleDefinition } from "@polkadot/types/types";

/* eslint-disable sort-keys */

/* Not sure where `equilibrium` comes from so disabling for now */
const definitions: OverrideBundleDefinition = {
  // derives: {
  //   ...equilibrium.instances.balances.reduce(
  //     (all, cur) => ({
  //       ...all,
  //       [cur]: {
  //         customAccount: createCustomAccount(cur, (currency: string, api?: ApiInterfaceRx) => {
  //           let assetsEnabled = true;

  //           try {
  //             api?.registry.createType('AssetIdInnerType' as any);
  //           } catch (_) {
  //             assetsEnabled = false;
  //           }

  //           return assetsEnabled ? { 0: u64FromCurrency(currency) } : currency;
  //         })
  //       }
  //     }),
  //     {}
  //   )
  // },

  // instances: equilibrium.instances,

  // types: [
  //   {
  //     minmax: [0, 264],
  //     types: equilibrium.types
  //   },
  //   {
  //     minmax: [265, undefined],
  //     types: equilibriumNext.types
  //   }
  // ]
};

export default { typesBundle: { spec: { equilibrum: definitions } } };
