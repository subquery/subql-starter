import {SignedBlock} from "@polkadot/types/interfaces";
import {SubstrateExtrinsic,SubstrateEvent} from "@subql/types";
import {starterEntity} from "../types/models/starterEntity";
import {Balance} from "@polkadot/types/interfaces";
import {SubstrateBlock} from "@subql/types";


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new starterEntity(block.block.header.hash.toString());
    //Record block number
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    const record = await starterEntity.get(event.extrinsic.block.block.header.hash.toString());
    record.field2 = account.toString();
    //Big integer type Balance of a transfer event
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = await starterEntity.get(extrinsic.block.block.header.hash.toString());
    //Date type timestamp
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}


