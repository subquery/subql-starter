import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    598,
    [],
    [
      StarterEntity.create({
        id: '0xe5d285e29ac5709ce6037b93bb0031d551e5836f32aa884948a5cccc40da7bb3', 
        field1: 598,
      }),
    ],
    'handleBlock',
  );
