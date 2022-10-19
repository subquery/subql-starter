import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { BioAuth, StarterEntity } from "../types";
import { Balance } from "@polkadot/types/interfaces";

const BIOAUTH_EXT_METHOD = Uint8Array.from(Buffer.from("0x0400", "hex"));

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  //Create a new starterEntity with ID using block hash
  let record = new StarterEntity(block.block.header.hash.toString());
  //Record block number
  record.field1 = block.block.header.number.toNumber();
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
  record.field2 = account.toString();
  //Big integer type Balance of a transfer event
  record.field3 = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  if (extrinsic.extrinsic.method.callIndex === BIOAUTH_EXT_METHOD) {
    const record = new BioAuth(extrinsic.block.block.header.hash.toString());
    //Record block number
    record.blockNumber = extrinsic.block.block.header.number.toNumber();
    record.signer = extrinsic.extrinsic.signer.toString();
    record.signature = extrinsic.extrinsic.signature.toString();

    record.ticket = extrinsic.extrinsic.method.args["req"]["ticket"];
    record.ticketSignature =
      extrinsic.extrinsic.method.args["req"]["ticketSignature"];

    await record.save();
  }
}
