import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    909,
    [],
    [
      StarterEntity.create({
        id: '0xc7ce771cfdb3ab1552e66538b596fa55094b02cb1b03a4c6d3d1f80d5af79923', 
        field1: 909,
      }),
    ],
    'handleBlock',
  );
