import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    242,
    [],
    [
      StarterEntity.create({
        id: '0x44e94d2e22be8f915c19e18d221260232516c40db63553d8e2d9c5ff63aae9c1', 
        field1: 242,
      }),
    ],
    'handleBlock',
  );
