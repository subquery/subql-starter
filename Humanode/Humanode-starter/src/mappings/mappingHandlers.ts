import { Codec } from "@polkadot/types/types";
import { Vec } from "@polkadot/types-codec";
import { SubstrateEvent } from "@subql/types";
import { BioauthNewAuthentication, ImOnlineSomeOffline } from "../types";

export async function handleBioauthNewAuthenticationEvent(
  substrateEvent: SubstrateEvent
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [validatorPublicKey],
  } = event;

  const record = BioauthNewAuthentication.create({
    id: `${block.block.header.number}-${idx}`,
    blockNumber: block.block.header.number.toNumber(),
    timestamp: block.timestamp,
    validatorPublicKey: validatorPublicKey.toString(),
  });
  await record.save();
}

export async function handleImonlineSomeOfflineEvent(
  substrateEvent: SubstrateEvent<[]>
): Promise<void> {
  const { event, block, idx } = substrateEvent;

  const {
    data: [offline],
  } = event;

  const record = ImOnlineSomeOffline.create({
    id: `${block.block.header.number}-${idx}`,
    blockNumber: block.block.header.number.toNumber(),
    timestamp: block.timestamp,
    accountIds: [],
  });

  for (const identification of offline as Vec<Codec>) {
    const [accountId, _fullIdentification] = identification as any as [
      Codec,
      Codec
    ];
    record.accountIds.push(accountId.toString());
  }
  await record.save();
}
