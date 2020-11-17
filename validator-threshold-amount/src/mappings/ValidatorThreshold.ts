import { SignedBlock } from '@polkadot/types/interfaces'
import {ValidatorThreshold} from "../types/Vt/ValidatorThreshold";
import {ApiPromise} from "@polkadot/api";
import axios from 'axios';

export async function handleBlock(block: SignedBlock): Promise<void> {
    let id = block.hash.toHex();
    const {validators} = await api.derive.staking.validators();
    console.log('validators: ', validators.length);
    // const accountInfos = await api.derive.staking.accounts(validators);
    const res = await axios.get('https://www.google.com');
    console.log(res.data.length);
    let entity = new ValidatorThreshold(id);
    let a: ApiPromise = api;
    await entity.save();
}