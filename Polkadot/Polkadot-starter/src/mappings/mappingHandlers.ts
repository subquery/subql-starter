import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { StarterEntity } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import assert from "assert";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  //Create a new starterEntity with ID using block hash
  let record = StarterEntity.create({
      id: block.block.header.hash.toString(),
      field1: block.block.header.number.toNumber()
  });
  //Record block number
  await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = await StarterEntity.get(
    event.block.block.header.hash.toString()
  );

  if (record) {
    record.field2 = account.toString();
    //Big integer type Balance of a transfer event
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
  }
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = await StarterEntity.get(
    extrinsic.block.block.header.hash.toString()
  );

  if (record) {
    //Date type timestamp
    record.field4 = extrinsic.block.timestamp;
    //Boolean type
    record.field5 = true;
    await record.save();
  }
}
