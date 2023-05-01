import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    566,
    [],
    [
      StarterEntity.create({
        id: '0x92e8b56ffc2964eb168de47cb4ed9a5a19f3931148208330a82c50b290ab21ba', 
        field1: 566,
      }),
    ],
    'handleBlock',
  );
