import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    592,
    [],
    [
      StarterEntity.create({
        id: '0xbe5dd7d5596a258522ffd60e6efd2e18535357c9a6a6d53b69917d507dc87ae3', 
        field1: 592,
      }),
    ],
    'handleBlock',
  );
