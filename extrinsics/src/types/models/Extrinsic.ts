import {Entity} from "@subql/types";
import assert from "assert";

export class Extrinsic implements Entity {

    constructor(id: string) {
        this.id = id;
    }
    public id:string;

    public NumExtrinsic: number;

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Extrinsic entity without an ID");
        store.set("Extrinsic", id.toString(), this);
    }

}