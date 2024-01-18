import { Approval, DApp, DAppReward, Transaction } from "../types";
import { WasmCall, WasmEvent } from "@subql/substrate-wasm-processor";
import { Balance, AccountId } from "@polkadot/types/interfaces/runtime";
import { Option } from "@polkadot/types-codec";
import { SubstrateEvent } from "@subql/types";
import assert from "assert";

// Setup types from ABI
type ApproveCallArgs = [AccountId, Balance];
type TransferEventArgs = [Option<AccountId>, Option<AccountId>, Balance];

export async function handleWasmCall(
  call: WasmCall<ApproveCallArgs>,
): Promise<void> {
  logger.info(`Processing WASM Call at ${call.blockNumber}`);

  if (typeof call.data !== "string") {
    const [spender, value] = call.data.args;

    const approval = Approval.create({
      id: `${call.blockNumber}-${call.idx}`,
      hash: call.hash,
      owner: call.from.toString(),
      contractAddress: call.from.toString(),
      spender: spender.toString(),
    });

    approval.value = value.toBigInt();

    await approval.save();
  } else {
    logger.info(`Decode call failed ${call.hash}`);
  }
}

export async function handleWasmEvent(
  event: WasmEvent<TransferEventArgs>,
): Promise<void> {
  assert(event.args, "No event.args");
  logger.info(`Processing WASM Even at ${event.blockNumber}`);
  const [from, to, value] = event.args;
  const transaction = Transaction.create({
    id: `${event.blockNumber}-${event.eventIndex}`,
    transactionHash: event.transactionHash,
    value: value.toBigInt(),
    from: from.toString(),
    to: to.toString(),
    contractAddress: event.contract.toString(),
  });

  await transaction.save();
}

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
  logger.info(
    `Processing new Dapp Staking Contract event at ${event.block.block.header.number}`,
  );
  const {
    event: {
      data: [accountId, smartContract],
    },
  } = event;
  // Retrieve the record by its ID
  let dapp: DApp | undefined = await DApp.get(smartContract.toString());

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
  logger.info(
    `Processing new Dapp Staking Bond and Stake event at ${event.block.block.header.number}`,
  );
  const {
    event: {
      data: [accountId, smartContract, balanceOf],
    },
  } = event;
  // Retrieve the dapp by its ID
  let dapp: DApp | undefined = await DApp.get(smartContract.toString());
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
  event: SubstrateEvent,
): Promise<void> {
  logger.info(
    `Processing new Dapp Staking Bond and Unstake event at ${event.block.block.header.number}`,
  );
  const {
    event: {
      data: [accountId, smartContract, balanceOf],
    },
  } = event;
  // Retrieve the dapp by its ID
  let dapp: DApp | undefined = await DApp.get(smartContract.toString());
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
  logger.info(
    `Processing new Dapp Staking Reward event at ${event.block.block.header.number}`,
  );
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
