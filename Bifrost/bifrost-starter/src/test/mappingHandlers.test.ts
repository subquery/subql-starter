import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    294,
    [],
    [
      StarterEntity.create({
        id: '0xadd9ab83d13ae5361a6a72273f077c88bc87474291e1ecadd5bb207ff59453f6', 
        field1: 294,
      }),
    ],
    'handleBlock',
  );
