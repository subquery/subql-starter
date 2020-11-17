import {ApiPromise} from "@polkadot/api";
import {Entity} from "./base";

declare global {
    const api: ApiPromise;

    namespace store {
        function get(entity: string, id: string): Entity | null
        function set(entity: string, id: string, data: Entity): void
        function remove(entity: string, id: string): void
    }
}

