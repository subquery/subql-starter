import { Approval, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";

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

export async function handleEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.value.toBigInt(),
    from: event.args.from,
    to: event.args.to,
    contractAddress: event.address,
  });

  await transaction.save();
}

export async function handleEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = Approval.create({
    id: event.hash,
    owner: event.from,
    value: event.args._value.toBigInt(),
    spender: event.args._spender,
    contractAddress: event.to,
  });

  await approval.save();
}
