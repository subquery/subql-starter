import {initApi, load } from "./tools/helpers";
import {jest} from "@jest/globals";



//Block #2586341
const TEST_BLOCKHASH = "0x93f7a254d27d749138c6fd49db470186761b607ea16f8a0109f288a57d079d0d";
let thisBlock;
async function prepareBlock(){
    const endpoint = 'wss://rpc.polkadot.io';
    const api = await initApi(endpoint);
    global['api'] = api;
    thisBlock = await api.rpc.chain.getBlock(TEST_BLOCKHASH);
}

let mapping;
let mockStore;
function initStore(){
    mockStore = {
        set:jest.fn()
    }
    global['store'] = mockStore;
}

//需要较长时间完成call
jest.setTimeout(300000);
beforeAll( async () => {
    await prepareBlock();
    mapping = await load(
        "../../node_modules",
        '../../lib/mappings/Extrinsic',
        'handleBlock');
});

beforeEach(() => {
    initStore()
});



test('测试mocked set公式被调用', async () => {
    expect.assertions(1);
    await mapping(thisBlock);
    expect(mockStore.set).toBeCalled();
});


test('测试set 的入参', async () => {
    expect.assertions(1);
    await mapping(thisBlock);
    const extrinsic_entity =  {"NumExtrinsic": 3, "id": "2586341"};
    expect(mockStore.set).lastCalledWith('Extrinsic', '2586341',extrinsic_entity)

});
