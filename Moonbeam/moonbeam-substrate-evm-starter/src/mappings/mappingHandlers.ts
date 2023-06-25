import {
	Erc20Transfer, Collator
}  from "../types";
import {
  FrontierEvmEvent
} from "@subql/frontier-evm-processor";

import {
  SubstrateExtrinsic,
  SubstrateEvent,
} from "@subql/types";

global.atob = require("atob");
global.Blob = require('node-blob');
import { BigNumber } from "ethers";

export async function handleCollatorJoined(call: SubstrateExtrinsic): Promise<void> {

  logger.info(`Processing SubstrateEvent at ${call.block.block.header.number}`);

  const address = call.extrinsic.signer.toString();

  const collator = Collator.create({
      id: address,
      joinedDate: call.block.timestamp
  });

  await collator.save();

}

export async function handleCollatorLeft(call: SubstrateExtrinsic): Promise<void> {

  logger.info(`Processing SubstrateCall at ${call.block.block.header.number}`);

  const address = call.extrinsic.signer.toString();
  await Collator.remove(address);
}

export async function handleErc20Transfer(event: FrontierEvmEvent<[string, string, BigNumber] & { from: string, to: string, value: BigNumber, }>): Promise<void> {
  const transfer = Erc20Transfer.create({
      id: event.transactionHash,
      from: event.args.from,
      to: event.args.to,
      amount: event.args.value.toBigInt(),
      contractAddress: event.address,
  });

  await transfer.save();
}