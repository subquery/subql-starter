import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    640,
    [],
    [
      StarterEntity.create({
        id: '0xe1ee9e0c50f8d3e3d498dd9c02e5ef447046f52004b6e597684e92aca695e04a', 
        field1: 640,
      }),
    ],
    'handleBlock',
  );
