import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    984,
    [],
    [
      StarterEntity.create({
        id: '0x45d79e5a99e192cdc95988201055ec7b1c711aeb06767aceaa606b3c4f4055e0', 
        field1: 984,
      }),
    ],
    'handleBlock',
  );
