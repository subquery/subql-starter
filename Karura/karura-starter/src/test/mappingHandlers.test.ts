import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    784,
    [],
    [
      StarterEntity.create({
        id: '0xfbd07dd83ab05a62f82b557b7e11ca216526e0285a03419fa2c5d26ee83ae7d1', 
        field1: 784,
      }),
    ],
    'handleBlock',
  );
