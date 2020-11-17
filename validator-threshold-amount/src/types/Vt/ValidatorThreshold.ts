import BN from 'bn.js';

import {Entity} from "../../base";
import assert from "assert";

export class ValidatorThreshold implements Entity {
    static load(id: string): ValidatorThreshold | null {
        return store.get("ValidatorThreshold", id) as ValidatorThreshold | null;
    }
    constructor(id: string) {
        this.id = id;
    }

    async save(): Promise<void> {
        let id = this.id;
        assert(id !== null, "Cannot save UniswapFactory entity without an ID");
        // assert(
        //     id.kind == ValueKind.STRING,
        //     "Cannot save UniswapFactory entity with non-string ID. " +
        //     'Considering using .toHex() to convert the "id" to a string.'
        // );
        store.set("ValidatorThreshold", id.toString(), this);
    }

    public id: string;

    public validator: string;

    public selfBonded: BN;

    public totalBonded: BN;
}