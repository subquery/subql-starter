import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    365,
    [],
    [
      StarterEntity.create({
        id: '0x4d0915c39d135c8cf67c1b66aee17c715b51c8a4e7dad85b233b9d645ea3fc0a', 
        field1: 365,
      }),
    ],
    'handleBlock',
  );
