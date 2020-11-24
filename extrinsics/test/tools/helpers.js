import amp from 'app-module-path';
import assert from "assert";

export async function load(root,file, funcName) {
    amp.addPath(root);
    const exports = await import(file);
    const func = exports[funcName];
    assert(typeof func === 'function', 'mapping handler must be function');
    return func;
}

export async function initApi(endpoint) {
    const {ApiPromise, WsProvider} = await import('@polkadot/api');
    const {HttpProvider} = await import('@polkadot/rpc-provider');
    return ApiPromise.create({ provider: new WsProvider(endpoint) });
}

