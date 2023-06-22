import {SubstrateEvent, SubstrateExtrinsic} from "@subql/types";
import {Erc20Transfer, Collator} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from '@ethersproject/bignumber';

export async function collatorJoined(event: SubstrateEvent): Promise<void> {

    const address = event.extrinsic.extrinsic.signer.toString();

    const collator = Collator.create({
        id: address,
        joinedDate: event.block.timestamp
    });

    await collator.save();

}

export async function collatorLeft(call: SubstrateExtrinsic): Promise<void> {

    const address = call.extrinsic.signer.toString();
    await Collator.remove(address);
}

export async function erc20Transfer(event: MoonbeamEvent<[string, string, BigNumber] & { from: string, to: string, value: BigNumber, }>): Promise<void> {
    const transfer = Erc20Transfer.create({
        id: event.transactionHash,
        from: event.args.from,
        to: event.args.to,
        amount: event.args.value.toBigInt(),
        contractAddress: event.address,
    });

    await transfer.save();
}


