import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    757,
    [],
    [
      StarterEntity.create({
        id: '0xe387d6a54ce2fc2127ce62a01e64b4f4a99d59db5a74b8af85e4e499d14501c4', 
        field1: 757,
      }),
    ],
    'handleBlock',
  );
