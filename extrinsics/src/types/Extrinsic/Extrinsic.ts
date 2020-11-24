import {Entity} from "../../base";
import assert from "assert";

export class Extrinsic implements Entity {

    constructor(id: string) {
        this.id = id;
    }
    public id!:string;

    //public blockNum!: string;

    public NumExtrinsic: number;

    async save(): Promise<void> {
        let id = this.id;
        //let id = this.blockNum; //use block number as id 暂时的
        assert(id !== null, "Cannot save Extrinsic entity without an ID");
        store.set("Extrinsic", id.toString(), this);
    }

}