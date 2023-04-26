import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    845,
    [],
    [
      StarterEntity.create({
        id: '0xfaf4e76dbe35e2d3480d98a77cec4db804f742468c85772b69abf18e33485be3', 
        field1: 845,
      }),
    ],
    'handleBlock',
  );
