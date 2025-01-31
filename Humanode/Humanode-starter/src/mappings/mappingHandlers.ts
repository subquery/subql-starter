import assert from "assert";
import { Codec } from "@polkadot/types/types";
import { Vec } from "@polkadot/types-codec";
import { SubstrateEvent } from "@subql/types";
import {
  ERC20TokenTransfer,
  ERC20Approval,
  BioauthNewAuthentication,
  ImOnlineSomeOffline,
} from "../types";
import { TransferLog } from "../types/abi-interfaces/Erc20Abi";
import { ApproveTransaction } from "../types/abi-interfaces/Erc20Abi";

export async function handleEVMLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = ERC20TokenTransfer.create({
    id: log.transactionHash,
    to: log.args.to,
    from: log.args.from,
    value: log.args.value.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}

export async function handleEVMTransaction(
  tx: ApproveTransaction,
): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = ERC20Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}

export async function handleBioauthNewAuthenticationEvent(
  substrateEvent: SubstrateEvent,
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [validatorPublicKey],
  } = event;

  const record = BioauthNewAuthentication.create({
    id: `${block.block.header.number}-${idx}`,
    blockNumber: block.block.header.number.toNumber(),
    timestamp: block.timestamp,
    validatorPublicKey: validatorPublicKey.toString(),
  });
  await record.save();
}

export async function handleImonlineSomeOfflineEvent(
  substrateEvent: SubstrateEvent<[]>,
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [offline],
  } = event;

  const record = ImOnlineSomeOffline.create({
    id: `${block.block.header.number}-${idx}`,
    blockNumber: block.block.header.number.toNumber(),
    timestamp: block.timestamp,
    accountIds: [],
  });

  for (const identification of offline as Vec<Codec>) {
    const [accountId, _fullIdentification] = identification as any as [
      Codec,
      Codec,
    ];
    record.accountIds.push(accountId.toString());
  }
  await record.save();
}
