import {hexDataSlice, stripZeros} from '@ethersproject/bytes';
import {EventRecord} from "@polkadot/types/interfaces"
import { SubstrateBlock, SubstrateExtrinsic } from "@subql/types";

export function inputToFunctionSighash(input: string): string {
    return hexDataSlice(input, 0, 4);
}

export function isZero(input: string): boolean {
    return stripZeros(input).length === 0;
}

function filterExtrinsicEvents(
    extrinsicIdx: number,
    events: EventRecord[],
): EventRecord[] {
    return events.filter(
        ({ phase }) =>
            phase.isApplyExtrinsic && phase.asApplyExtrinsic.eqn(extrinsicIdx),
    );
}

export function wrapExtrinsics(
    wrappedBlock: SubstrateBlock,
): SubstrateExtrinsic[] {
    return wrappedBlock.block.extrinsics.map((extrinsic, idx) => {
        const events = filterExtrinsicEvents(idx, wrappedBlock.events);
        return {
            idx,
            extrinsic,
            block: wrappedBlock,
            events,
            success: getExtrinsicSuccess(events),
        };
    });
}

function getExtrinsicSuccess(events: EventRecord[]): boolean {
    return (
        events.findIndex((evt) => evt.event.method === 'ExtrinsicSuccess') > -1
    );
}
