import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    834,
    [],
    [
      StarterEntity.create({
        id: '0xc8ef544cc71e64f6241cdb563535699ca5f36753efe3d7817cf29813e847755f', 
        field1: 834,
      }),
    ],
    'handleBlock',
  );
