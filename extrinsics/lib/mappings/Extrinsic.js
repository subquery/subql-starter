"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBlock = void 0;
const Extrinsic_1 = require("../types/extrinsic/Extrinsic");
const { ApiPromise, WsProvider } = require('@polkadot/api');
const provider = new WsProvider("wss://rpc.polkadot.io");
async function handleBlock(thisBlock) {
    const api = await ApiPromise.create({ provider });
    const blockNum = thisBlock.block.header.number.toString();
    const blockHash = await api.rpc.chain.getBlockHash(blockNum);
    let entity = new Extrinsic_1.Extrinsic(blockHash.toJSON());
    entity.id = blockNum;
    entity.NumExtrinsic = thisBlock.block.extrinsics.length;
    await entity.save();
}
exports.handleBlock = handleBlock;
