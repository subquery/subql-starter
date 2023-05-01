import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    745,
    [],
    [
      StarterEntity.create({
        id: '0x7c6448df705ab53c72c989eb789f7a557da6bbb194548e5d340ce89c1ccf1383', 
        field1: 745,
      }),
    ],
    'handleBlock',
  );
