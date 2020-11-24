
import {Extrinsic} from "../types/extrinsic/Extrinsic";
import {SignedBlock} from "@polkadot/types/interfaces";
const { ApiPromise, WsProvider } = require('@polkadot/api');
const provider = new WsProvider("wss://rpc.polkadot.io");

export async function handleBlock(thisBlock: SignedBlock): Promise<void> {

    const api = await ApiPromise.create({ provider });
    const blockNum = thisBlock.block.header.number.toString();
    const blockHash = await api.rpc.chain.getBlockHash(blockNum);

    let entity = new Extrinsic(blockHash.toJSON());
    entity.id= blockNum;
    entity.NumExtrinsic = thisBlock.block.extrinsics.length;
    await entity.save();

}
