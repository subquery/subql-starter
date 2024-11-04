import { BridgeTransaction, XCMMessageCache } from "../types";
import assert from "assert";
import { SubstrateEvent } from "@subql/types";
import { EthereumLog } from "@subql/types-ethereum";

export async function handleEVMLog(log: EthereumLog): Promise<void> {
  logger.info(`OutBound log on ${log.blockNumber}`);
  if (log.topics[0] == "0x7153f9357c8ea496bba60bf82e67143e27b64462b49041f8e689e1b05728f84f") {
    const assetTransferLog = log.transaction.logs?.find((log) => log.topics[0].toString() == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef")
    const asset = assetTransferLog?.address.toString();
    const amount = assetTransferLog?.data.toString();
    assert(asset && amount, "Asset and amount must be found in the log");
    const message = log.topics[2].toString();
    const bridgeTx = BridgeTransaction.create({
      id: message,
      transactionOnSource: { chain: "Ethereum", id: log.transactionHash.toString() },
      token: asset,
      amount: BigInt(parseInt(amount, 16)),
    });
    const xcmMessageCache = await XCMMessageCache.get(message);
    if (xcmMessageCache) {
      bridgeTx.transactionOnTarget = { chain: "Asset Hub", id: xcmMessageCache.blockEventId };
    }
    await bridgeTx.save();
  }
  else if (log.topics[0] == "0x617fdb0cb78f01551a192a3673208ec5eb09f20a90acf673c63a0dcb11745a7a") {
    const assetTransferLog = log.transaction.logs?.find((log) => log.topics[0].toString() == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef")
    const asset = assetTransferLog?.address.toString();
    const amount = assetTransferLog?.data.toString();
    assert(asset && amount, "Asset and amount must be found in the log");
    const bridgeTx = BridgeTransaction.create({
      id: log.topics[2].toString(),
      transactionOnTarget: { chain: "Ethereum", id: log.transactionHash.toString() },
      token: asset,
      amount: BigInt(parseInt(amount, 16)),
    });
    const xcmMessageCache = await XCMMessageCache.get(log.topics[2].toString());
    if (xcmMessageCache) {
      bridgeTx.transactionOnSource = { chain: "Asset Hub", id: xcmMessageCache.blockEventId };
    }
  }
  else {
    logger.info(`Log will not be handled`);
  }
}

export async function handleReceived(event: SubstrateEvent): Promise<void> {
  const blockEventId = `${event.block.block.header.number.toNumber()}-${event.idx}`;
  const {
    event: {
      data: [message],
    },
  } = event;
  const bridgeTx = await BridgeTransaction.get(message.toString());
  if (bridgeTx) {
    bridgeTx.transactionOnTarget = { chain: "Asset Hub", id: blockEventId };
    await bridgeTx.save();
  } else {
    const xcmMessageCache = XCMMessageCache.create({
      id: message.toString(),
      blockEventId: blockEventId
    });
    await xcmMessageCache.save();

  }
}

export async function handleSent(event: SubstrateEvent): Promise<void> {
  const blockEventId = `${event.block.block.header.number.toNumber()}-${event.idx}`;
  const {
    event: {
      data: [, , , message],
    },
  } = event;
  const bridgeTx = await BridgeTransaction.get(message.toString());
  if (bridgeTx) {
    bridgeTx.transactionOnSource = { chain: "Asset Hub", id: blockEventId };
    await bridgeTx.save();
  } else {
    const xcmMessageCache = XCMMessageCache.create({
      id: message.toString(),
      blockEventId: blockEventId,
    });
    await xcmMessageCache.save();
  }
}