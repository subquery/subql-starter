import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    922,
    [],
    [
      StarterEntity.create({
        id: '0x2840315d11fc611dfbb0664a286d27fc4402beeea7f0ca24dd2ac019486ccbd6', 
        field1: 922,
      }),
    ],
    'handleBlock',
  );
