import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    812,
    [],
    [
      StarterEntity.create({
        id: '0xc224c5335d6613250fb64d88a5b954cfe210d23e58b152e652ae559f45b37199', 
        field1: 812,
      }),
    ],
    'handleBlock',
  );
