"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extrinsic = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
class Extrinsic {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        //let id = this.blockNum; //use block number as id 暂时的
        assert_1.default(id !== null, "Cannot save Extrinsic entity without an ID");
        store.set("Extrinsic", id.toString(), this);
    }
}
exports.Extrinsic = Extrinsic;
