import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    221,
    [],
    [
      StarterEntity.create({
        id: '0x29c4a1c7253806a2891b53b05b75e2ede81dc3249987438bab492750035fad20', 
        field1: 221,
      }),
    ],
    'handleBlock',
  );
