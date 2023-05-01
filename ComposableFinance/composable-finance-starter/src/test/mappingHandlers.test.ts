import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    574,
    [],
    [
      StarterEntity.create({
        id: '0x45367586666433c6508c62207e29580a7bf80d095aad28139e57c1874d15c7e4', 
        field1: 574,
      }),
    ],
    'handleBlock',
  );
