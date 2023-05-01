import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    219,
    [],
    [
      StarterEntity.create({
        id: '0x96a3a6942346fcda3986d9f999bf519d61d3223bc48173cefb5ffdbd48ccbfd7', 
        field1: 219,
      }),
    ],
    'handleBlock',
  );
