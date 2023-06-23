/*import { subqlTest } from "@subql/testing";
import { Transfer,Token,Contract,Owner } from "../types";

let newToken= new Token("1");



subqlTest(
    "handleBlock test",
    3497330,
    [
      Contract.create({
        id: '0x1FF2ADAa387dD27c22b31086E658108588eDa03a',
        name: 'CryptoPunks',
        symbol: 'PUNK',
        totalSupply: BigInt(10000),
      }),
      Transfer.create({
        id: '0x1FF2ADAa387dD27c22b31086E658108588eDa03aTRANSFERID',
        tokenId:"1",
        fromId: '0x00000000000FROM',
        toId: '0x00000000000TO',
        timestamp: BigInt(1627440000),
        block: BigInt(3497330),
        transactionHash: '0x1FF2ADAa387dD27c22b31086E658108588eDa03aTRANSACTIONHASH',
      }),
    ],
    [
      Owner.create({
        id: '0x00000000000TO', 
        balance: BigInt(1),
      }),
    ],
    'handleTransfer',
  );*/