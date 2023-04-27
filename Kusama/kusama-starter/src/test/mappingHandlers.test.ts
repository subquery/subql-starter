import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    662,
    [],
    [
      StarterEntity.create({
        id: '0xefa40cc944460a54bd5978478130e7fe27c166b0425ed9b893bd6086495929f5', 
        field1: 662,
      }),
    ],
    'handleBlock',
  );
