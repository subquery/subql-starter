import { ERC20TokenTransfer, ERC20Approval, SubstrateTransfer } from "../types";
import { TransferLog } from "../types/abi-interfaces/Erc20Abi";
import { ApproveTransaction } from "../types/abi-interfaces/Erc20Abi";
import assert from "assert";
import { SubstrateEvent } from "@subql/types";
import { Balance } from "@polkadot/types/interfaces";

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

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.block.block.header.number.toString()}`,
  );
  const {
    event: {
      data: [from, to, amount],
    },
  } = event;

  const blockNumber: number = event.block.block.header.number.toNumber();
  const transfer = SubstrateTransfer.create({
    id: `${event.block.block.header.number.toNumber()}-${event.idx}`,
    blockNumber,
    date: event.block.timestamp,
    from: from.toString(),
    to: to.toString(),
    amount: (amount as Balance).toBigInt(),
  });

  await transfer.save();
}
