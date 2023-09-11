// Copyright 2020-2023 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

// import {
//   SubstrateCustomDatasource,
//   SubstrateDatasourceKind,
//   SubstrateHandlerKind,
//   SubstrateProject
// } from '@subql/types';
// import {FileReference} from '@subql/types-core';

// const myAssets = new Map<string, FileReference>();
// myAssets.set('erc20',{file:'./abis/erc20Metadata.json'})
//
// // user could import FrontierEvmDatasource/wasm etc
// const CustomDs: SubstrateCustomDatasource = {
//   kind:'substrate/FrontierEvm',
//   startBlock:1,
//   assets: myAssets,
//   processor: {file: '', options:{}},
//   mapping:{
//     file:'',
//     handlers:[{handler:'handleBond',kind:'substrate/BlockHandler'}],
//   }
// }
//
// const project: SubstrateProject = {
//   version: '1',
//   name: 'tsProject',
//   schema: {file:'path/to/schema'},
//   specVersion: '1.0.0',
//   network: {
//     chainId: '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
//     chaintypes: {file: './dist/chaintypes.js'}
//   },
//   dataSources:[
//     {
//       kind: SubstrateDatasourceKind.Runtime,
//       startBlock:1,
//       mapping:{
//         file:'',
//         handlers:[{handler:'handleBond',kind: SubstrateHandlerKind.Block}],
//       }
//     },
//     CustomDs,
//   ],
//   runner: {
//     query:{
//       name:'@subql/query',
//       version:'*'
//     },
//     node:{
//       name:'@subql/node',
//       version:'*'
//     }},
//   description:''
// }
//
// export default project;
