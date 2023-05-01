import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    320,
    [],
    [
      StarterEntity.create({
        id: '0x3d051f90fa46b942ab1025f56f61e56b030c4af44d8cd3fd914267dd6804ebb3', 
        field1: 320,
      }),
    ],
    'handleBlock',
  );
