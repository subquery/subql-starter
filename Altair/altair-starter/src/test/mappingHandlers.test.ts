import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    309,
    [],
    [
      StarterEntity.create({
        id: '0xc55a34274da478c53033a186fa86ece2f6ebd4eb96bd7df7b9e19ab83caa6e77', 
        field1: 309,
      }),
    ],
    'handleBlock',
  );
