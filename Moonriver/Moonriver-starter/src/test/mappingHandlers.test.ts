import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    396,
    [],
    [
      StarterEntity.create({
        id: '0x846b8584cb3dc5693f85c02b74fed133e4eac06e6a8bb4ff6049a5a147654dd9', 
        field1: 396,
      }),
    ],
    'handleBlock',
  );
