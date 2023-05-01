import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    790,
    [],
    [
      StarterEntity.create({
        id: '0xa3efbe24cb11fb6650a758b160b61871314b9637842e8ce82235cbafb1310a33', 
        field1: 790,
      }),
    ],
    'handleBlock',
  );
