import { SubstrateEvent } from "@subql/types";
import { DApp, DAppReward } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import { Json } from "@polkadot/types-codec";

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [accountId, smartContract],
    },
  } = event;
  // Retrieve the record by its ID
  let dapp: DApp = await DApp.get(smartContract.toString());
  if (!dapp) {
    dapp = DApp.create({
      id: smartContract.toString(),
      accountID: accountId.toString(),
      totalStake: BigInt(0),
    });

    await dapp.save();
  }
}

export async function handleBondAndStake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [accountId, smartContract, balanceOf],
    },
  } = event;
  // Retrieve the dapp by its ID
  let dapp: DApp = await DApp.get(smartContract.toString());
  if (!dapp) {
    dapp = DApp.create({
      id: smartContract.toString(),
      accountID: accountId.toString(),
      totalStake: BigInt(0),
    });
  }

  dapp.totalStake += (balanceOf as Balance).toBigInt();
  await dapp.save();
}

export async function handleUnbondAndUnstake(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [accountId, smartContract, balanceOf],
    },
  } = event;
  // Retrieve the dapp by its ID
  let dapp: DApp = await DApp.get(smartContract.toString());
  if (!dapp) {
    dapp = DApp.create({
      id: smartContract.toString(),
      accountID: accountId.toString(),
      totalStake: BigInt(0),
    });
  }

  dapp.totalStake -= (balanceOf as Balance).toBigInt();
  await dapp.save();
}

export async function handleReward(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [accountID, smartContract, eraIndex, balanceOf],
    },
  } = event;
  // Retrieve the record by its ID
  const dAppReward: DAppReward = DAppReward.create({
    id: `${event.block.block.header.number.toNumber()}-${event.idx}`,
    dAppId: smartContract.toString(),
    accountID: accountID.toString(),
    eraIndex: parseInt(eraIndex.toString()),
    balanceOf: (balanceOf as Balance).toBigInt(),
  });
  await dAppReward.save();
}
