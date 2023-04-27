import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    172,
    [],
    [
      StarterEntity.create({
        id: '0x01b00d81d0df5dab7b9947995c5ecd33cedfb9d344211e3913d1efb1d790602a', 
        field1: 483250,
      }),
    ],
    'handleBlock',
  );
