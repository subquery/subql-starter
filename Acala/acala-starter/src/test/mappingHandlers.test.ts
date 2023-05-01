import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    321,
    [],
    [
      StarterEntity.create({
        id: '0x9bd91b0f0ba907009e9056acacb27054f0e4b367724d22ee9983663d29c82a68', 
        field1: 321,
      }),
    ],
    'handleBlock',
  );
