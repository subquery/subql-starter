import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    460,
    [],
    [
      StarterEntity.create({
        id: '0x97e4f26292078fc8bda3307943fc72e0cb837afe9a7773e93f90af206722f6ed', 
        field1: 460,
      }),
    ],
    'handleBlock',
  );
