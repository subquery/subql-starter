import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    246,
    [],
    [
      StarterEntity.create({
        id: '0x484f76ee8f41ca82677cbc632d7e449716d367a36d93425d2c15727699f88890', 
        field1: 246,
      }),
    ],
    'handleBlock',
  );
