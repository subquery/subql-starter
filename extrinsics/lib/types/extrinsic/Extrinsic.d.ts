import { Entity } from "../../base";
export declare class Extrinsic implements Entity {
    constructor(id: string);
    id: string;
    NumExtrinsic: number;
    save(): Promise<void>;
}
