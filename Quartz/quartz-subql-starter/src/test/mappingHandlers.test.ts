import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    773,
    [],
    [
      StarterEntity.create({
        id: '0xeb992ddfe4ffef9d264bf8ad2f511df0972e66fe6635562888247bd7d00e47f3', 
        field1: 773,
      }),
    ],
    'handleBlock',
  );
