import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    377,
    [],
    [
      StarterEntity.create({
        id: '0xc1ccfdd7b44287f41283c454ce3856fa304db2fb07c5d0bf386f12f94048a7a4', 
        field1: 377,
      }),
    ],
    'handleBlock',
  );
