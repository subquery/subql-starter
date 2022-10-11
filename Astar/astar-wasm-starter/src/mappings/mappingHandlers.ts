import { Approval, Transaction } from "../types";
import { WasmCall, WasmEvent } from "@subql/substrate-wasm-processor";
import { Balance, AccountId } from "@polkadot/types/interfaces/runtime";
import { Option } from "@polkadot/types-codec";

// Setup types from ABI
type ApproveCallArgs = [AccountId, Balance];
type TransferEventArgs = [Option<AccountId>, Option<AccountId>, Balance];

export async function handleWasmCall(
  call: WasmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(`${call.blockNumber}-${call.idx}`);
  approval.hash = call.hash;
  approval.owner = call.from.toString();
  approval.contractAddress = call.dest.toString();
  if (typeof call.data !== "string") {
    const [spender, value] = call.data.args;
    approval.spender = spender.toString();
    approval.value = value.toBigInt();
  } else {
    logger.info(`Decode call failed ${call.hash}`);
  }
  await approval.save();
}

export async function handleWasmEvent(
  event: WasmEvent<TransferEventArgs>
): Promise<void> {
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
