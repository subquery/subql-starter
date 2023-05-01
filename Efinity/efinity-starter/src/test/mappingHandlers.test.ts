import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    332,
    [],
    [
      StarterEntity.create({
        id: '0xc70535b2612865ee5eabfb56745d3a18ea372f37a59c63e1856167a23ea989b1', 
        field1: 332,
      }),
    ],
    'handleBlock',
  );
