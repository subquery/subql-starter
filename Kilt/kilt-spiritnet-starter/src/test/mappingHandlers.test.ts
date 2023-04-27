import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    686,
    [],
    [
      StarterEntity.create({
        id: '0x1b315f83a603d1a84dd24ce3505dd8aeff83987b53792bfbd109c9916e9c2464', 
        field1: 686,
      }),
    ],
    'handleBlock',
  );
