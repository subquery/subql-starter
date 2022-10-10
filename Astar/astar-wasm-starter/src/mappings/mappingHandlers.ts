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
  if (typeof call.data !== "string") {
    const [spender, value] = call.data.args;
    approval.spender = spender.toString();
    approval.value = value.toBigInt();
  } else {
    logger.info(`Decode call failed ${call.hash}`);
  }
  approval.contractAddress = call.dest.toString();
  await approval.save();
}

export async function handleSubstrateWasmEvent(
  event: WasmEvent<TransferEventArgs>
): Promise<void> {
  const [from, to, value] = event.args;
  const transaction = new Transaction(
    `${event.blockNumber}-${event.eventIndex}`
  );
  transaction.transactionHash = event.transactionHash;
  transaction.value = value.toBigInt();
  transaction.from = from.toString();
  transaction.to = to.toString();
  transaction.contractAddress = event.contract.toString();
  await transaction.save();
}
