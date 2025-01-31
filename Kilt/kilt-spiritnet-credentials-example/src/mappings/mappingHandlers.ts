import { SubstrateEvent } from "@subql/types";
import { Aggregation, Attestation } from "../types";
import assert from "assert";

export async function handleAttestationCreated(
  event: SubstrateEvent,
): Promise<void> {
  logger.info(
    `New attestation created at block ${event.block.block.header.number}`,
  );
  // A new attestation has been created.\[attester ID, claim hash, CType hash, (optional) delegation ID\]
  const {
    event: {
      data: [attesterID, claimHash, hash, delegationID],
    },
  } = event;

  assert(event.extrinsic, "Missing event.extrinsic");
  const attestation = Attestation.create({
    id: claimHash.toString(),
    createdDate: event.block.timestamp,
    createdBlock: event.block.block.header.number.toBigInt(),
    creator: event.extrinsic.extrinsic.signer.toString(),
    creationClaimHash: claimHash.toString(),
    hash: hash.toString(),
    attestationId: attesterID.toString(),
    delegationID: delegationID ? delegationID.toString() : undefined,
  });

  await attestation.save();
  if (event.block.timestamp) {
    await handleDailyUpdate(event.block.timestamp, "CREATED");
  }
}

export async function handleAttestationRevoked(
  event: SubstrateEvent,
): Promise<void> {
  logger.info(
    `New attestation revoked at block ${event.block.block.header.number}`,
  );
  // An attestation has been revoked.\[account id, claim hash\]
  const {
    event: {
      data: [accountID, claimHash],
    },
  } = event;

  const attestation = await Attestation.get(claimHash.toString());

  assert(attestation, "Can't find an attestation");
  attestation.revokedDate = event.block.timestamp;
  attestation.revokedBlock = event.block.block.header.number.toBigInt();
  attestation.revokedClaimHash = claimHash.toString();

  await attestation.save();
  if (event.block.timestamp) {
    await handleDailyUpdate(event.block.timestamp, "REVOKED");
  }
}

export async function handleDailyUpdate(
  date: Date,
  type: "CREATED" | "REVOKED",
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await Aggregation.get(id);
  if (!aggregation) {
    aggregation = Aggregation.create({
      id,
      attestationsCreated: 0,
      attestationsRevoked: 0,
    });
  }
  if (type === "CREATED") {
    aggregation.attestationsCreated++;
  } else if (type === "REVOKED") {
    aggregation.attestationsRevoked++;
  }

  await aggregation.save();
}
