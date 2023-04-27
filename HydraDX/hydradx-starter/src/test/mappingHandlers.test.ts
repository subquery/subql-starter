import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    911,
    [],
    [
      StarterEntity.create({
        id: '0xa70e3af8ae618c945ea87f49b6a777a1e8c1d4d47ab18fa4635a57e21af06c3b', 
        field1: 911,
      }),
    ],
    'handleBlock',
  );
