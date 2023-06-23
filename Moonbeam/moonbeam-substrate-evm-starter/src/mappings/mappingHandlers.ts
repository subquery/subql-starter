import {
	Token, Owner, Contract, Transfer,
}  from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
global.atob = require("atob");
global.Blob = require('node-blob');
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { Erc721Abi__factory } from "../types/contracts";
import { FrontierEthProvider } from "@subql/frontier-evm-processor";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: string;
};

export async function handleTransfer(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  
  logger.info('New log found at ' + event.blockNumber.toString());
  let previousOwner = await Owner.get(event.args.from);
  let newOwner = await Owner.get(event.args.to);
  let token = await Token.get(event.args.tokenId.toString());
  let transferId = event.transactionHash;
  let transfer = await Transfer.get(transferId);
  let contract = await Contract.get(event.address);
  let provider = new ethers.providers.JsonRpcProvider("https://moonbeam.blastapi.io/bc88ffcb-8768-4dc8-aee4-5bbb4e285a73");
  const instance = Erc721Abi__factory.connect(event.address, provider );
  logger.info('Contract instance initiated'+instance.address.toString());


  if (previousOwner == null) {
    previousOwner = new Owner(event.args.from);

    previousOwner.balance = BigInt(0);
  } else {
    let prevBalance = previousOwner.balance;
    if (prevBalance > BigInt(0)) {
      previousOwner.balance = prevBalance - BigInt(1);
    }
  }

  if (newOwner == null) {
    newOwner = new Owner(event.args.to);
    newOwner.balance = BigInt(1);
  } else {
    let prevBalance = newOwner.balance;
    newOwner.balance = prevBalance + BigInt(1);
  }

  if (token == null) {
    token = new Token(event.args.tokenId.toString());
    token.contractId = event.address;

    try
    {
      let uri = await  instance.tokenURI(event.args.tokenId.toString());
      logger.info('token uri'+uri);
      if (!uri==null) {
        token.uri = uri;
      }
    }
    catch(e){}
  }

  token.ownerId = event.args.to;

  if (transfer == null) {
    transfer = new Transfer(transferId);
    transfer.tokenId = event.args.tokenId.toString();
    transfer.fromId = event.args.from;
    transfer.toId = event.args.to;
    transfer.timestamp = BigInt(event.blockTimestamp.getTime());
    transfer.block = BigInt(event.blockNumber);
    transfer.transactionHash = event.transactionHash;
  }

  if (contract == null) {
    contract = new Contract(event.address);
  }

  try
    {
      let name = await  instance.name();
      if (!name==null) {
        contract.name = name;
      }
    }
  catch(e){}

  try
    {
      let symbol = await  instance.symbol();
      if (!symbol==null) {
        contract.symbol = symbol;
      }
    }
  catch(e){}

  try
    {
      let totalSupply = await  instance.totalSupply();
      if (!totalSupply==null) {
        contract.totalSupply = BigInt(totalSupply.toString());
      }
    }
  catch(e){}

  previousOwner.save();
  logger.info('prev owner stored'+previousOwner.id.toString());
  newOwner.save();
  logger.info('new owner stored' + newOwner.id.toString());
  token.save();
  logger.info('token stored'+token.id.toString());
  contract.save();
  logger.info('contract stored'+contract.id.toString());
  transfer.save();
  logger.info('transfer stored'+  transfer.id.toString());
  
}
