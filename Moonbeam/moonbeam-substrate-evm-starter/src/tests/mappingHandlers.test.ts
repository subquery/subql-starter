import {subqlTest} from "@subql/testing";
import {Collator, Erc20Transfer} from "../types";


subqlTest(
  "newCollator test", // test name
  1, // block height to process
  [
    Collator.create({
      id: "1",
      joinedDate: new Date(1000),
    }),
  ], // dependent entities
  [
    Collator.create({
      id: "1",
      joinedDate: new Date(1000),
    })
  ], // expected entities
  "handleCollatorJoined" //handler name
);