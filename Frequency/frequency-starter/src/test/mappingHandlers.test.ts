import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    428,
    [],
    [
      StarterEntity.create({
        id: '0x69d263827f79d7905fd3cbde40aa5cd4b819ad750cb0dcb0febf5dde0c59d123', 
        field1: 428,
      }),
    ],
    'handleBlock',
  );
