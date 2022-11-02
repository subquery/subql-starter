import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { BioauthNewAuthentication } from "../types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {}

export async function handleEvent(
  substrateEvent: SubstrateEvent
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  if (event.section != "bioauth" || event.method != "NewAuthentication") {
    // Not what we are looking for, skip this event.
    // If needed, we could route the event handling logic based on these fields.
    return;
  }

  const {
    data: [validatorPublicKey],
  } = event;

  // Retrieve the record by its ID.
  const record = new BioauthNewAuthentication(
    `${block.block.header.number}-${idx}`
  );
  record.blockNumber = block.block.header.number.toNumber();
  record.validatorPublicKey = validatorPublicKey.toString();
  record.timestamp = block.timestamp;
  await record.save();
}

export async function handleCall(call: SubstrateExtrinsic): Promise<void> {}
