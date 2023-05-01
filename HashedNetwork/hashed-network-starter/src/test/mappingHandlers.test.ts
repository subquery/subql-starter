import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    654,
    [],
    [
      StarterEntity.create({
        id: '0x91cb75481c351bb75c137c00eef1369223482acf3d2897846db6cd0c2ddb60f6', 
        field1: 654,
      }),
    ],
    'handleBlock',
  );
