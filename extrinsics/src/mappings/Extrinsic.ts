
import {Extrinsic} from "../types/extrinsic/Extrinsic";
import {SignedBlock} from "@polkadot/types/interfaces";

export async function handleBlock(thisBlock: SignedBlock): Promise<void> {
    const blockNum = thisBlock.block.header.number.toString();
    const blockHash = thisBlock.block.header.hash.toString();

    let entity = new Extrinsic(blockHash);
    entity.id= blockNum;
    entity.NumExtrinsic = thisBlock.block.extrinsics.length;
    await entity.save();

}
