import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    765,
    [],
    [
      StarterEntity.create({
        id: '0x9c8d8d5a5f7029cbfba5bdc886ebd05be60f1bca4d635ca12876bcfd445e57b0', 
        field1: 765,
      }),
    ],
    'handleBlock',
  );
