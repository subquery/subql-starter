import {
  Approval,
  Transaction,
  BioauthNewAuthentication,
  ImOnlineSomeOffline,
} from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";
import assert from "assert";
import { Codec } from "@polkadot/types/types";
import { Vec } from "@polkadot/types-codec";
import { SubstrateEvent } from "@subql/types";

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
  assert(event.transactionHash, "No transactionHash");

  const transaction = Transaction.create({
    id: `${event.blockNumber}-${event.transactionHash}-${event.logIndex}`,
    value: event.args?.value.toBigInt(),
    from: event.args?.from,
    to: event.args?.to,
    blockHeight: event.blockNumber.toString(),
    contractAddress: event.address,
    transactionHash: event.transactionHash,
  });
  await transaction.save();
}

export async function handleEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
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

export async function handleBioauthNewAuthenticationEvent(
  substrateEvent: SubstrateEvent
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
  substrateEvent: SubstrateEvent<[]>
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
      Codec
    ];
    record.accountIds.push(accountId.toString());
  }
  await record.save();
}
