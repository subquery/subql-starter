import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    378,
    [],
    [
      StarterEntity.create({
        id: '0x0890dc078f7ebd59196dd20fcecbd436e97a367f4b87c44ea3734c680a6d5a68', 
        field1: 378,
      }),
    ],
    'handleBlock',
  );
