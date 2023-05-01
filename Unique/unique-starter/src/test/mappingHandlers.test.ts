import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    783,
    [],
    [
      StarterEntity.create({
        id: '0xa0d626406b5cdd808c20b8e29036cdec83b66ad5c7071d69852bd49bc1e64a0e', 
        field1: 783,
      }),
    ],
    'handleBlock',
  );
