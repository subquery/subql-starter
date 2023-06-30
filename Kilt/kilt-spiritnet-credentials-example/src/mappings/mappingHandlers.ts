import { SubstrateEvent } from "@subql/types";
import { Attestation } from "../types";
import assert from "assert";

export async function handleAttestationCreated(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New attestation created at block ${event.block.block.header.number}`
  );
  // A new attestation has been created.\[attester ID, claim hash, CType hash, (optional) delegation ID\]
  const {
    event: {
      data: [attesterID, claimHash, hash, delegationID],
    },
  } = event;

  const attestation = Attestation.create({
    id: attesterID.toString(),
    createdDate: event.block.timestamp,
    createdBlock: event.block.block.header.number.toBigInt(),
    creator: event.extrinsic.extrinsic.signer.toString(),
    creationClaimHash: claimHash.toString(),
    hash: hash.toString(),
    delegationID: delegationID ? delegationID.toString() : null,
  });

  await attestation.save();
}

export async function handleAttestationRevoked(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New attestation revoked at block ${event.block.block.header.number}`
  );
  // An attestation has been revoked.\[account id, claim hash\]
  const {
    event: {
      data: [accountID, claimHash],
    },
  } = event;

  const attestation = await Attestation.get(accountID.toString());

  assert(attestation, "Can't find an attestation");
  attestation.revokedDate = event.block.timestamp;
  attestation.revokedBlock = event.block.block.header.number.toBigInt();
  attestation.revokedClaimHash = claimHash.toString();

  await attestation.save();
}