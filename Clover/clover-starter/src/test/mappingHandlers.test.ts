import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    571,
    [],
    [
      StarterEntity.create({
        id: '0x26ef6820995ebcb2fb89a3f9b89983115a7acd157269d937d4065f5b8380dfcd', 
        field1: 571,
      }),
    ],
    'handleBlock',
  );
