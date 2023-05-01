import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    502,
    [],
    [
      StarterEntity.create({
        id: '0x113b78998c8197d9467f8fdaae8167a9a372d5fd2b427ffa6803aff2bb6d4457', 
        field1: 502,
      }),
    ],
    'handleBlock',
  );
