import { Approval, Transaction } from "../types";
import { AcalaEvmEvent, AcalaEvmCall } from "@subql/acala-evm-processor";

import { BigNumber } from "ethers";
import assert from "assert";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

export async function handleAcalaEvmEvent(
  event: AcalaEvmEvent<TransferEventArgs>,
): Promise<void> {
  assert(event.args, "No event args");
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.value.toBigInt(),
    from: event.args.from,
    to: event.args.to,
    contractAddress: event.address,
  });

  await transaction.save();
}

export async function handleAcalaEvmCall(
  event: AcalaEvmCall<ApproveCallArgs>,
): Promise<void> {
  assert(event.args, "No event.args");
  assert(event.to, "No event.to");

  const approval = Approval.create({
    id: event.hash,
    owner: event.from,
    value: event.args._value.toBigInt(),
    spender: event.args._spender,
    contractAddress: event.to,
  });
  await approval.save();
}
