import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    429,
    [],
    [
      StarterEntity.create({
        id: '0xb4228ef20b41acf16f58c6da73f1886e81769466c33811e906dd6ccf240aec0a', 
        field1: 429,
      }),
    ],
    'handleBlock',
  );
