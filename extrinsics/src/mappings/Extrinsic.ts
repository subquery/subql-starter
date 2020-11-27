import {SignedBlock} from "@polkadot/types/interfaces";
import {Extrinsic} from "../types/models/Extrinsic";

export async function handleBlock(thisBlock: SignedBlock): Promise<void> {
    const blockNum = thisBlock.block.header.number.toString();
    const blockHash = thisBlock.block.header.hash.toString();

    let entity = new Extrinsic(blockHash);
    entity.id= blockNum;
    entity.NumExtrinsic = thisBlock.block.extrinsics.length;
    await entity.save();

}
