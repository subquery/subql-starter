import { subqlTest } from "@subql/testing";
import { StarterEntity } from "../types";

subqlTest(
    "handleBlock test",
    440,
    [],
    [
      StarterEntity.create({
        id: '0xb183499c17ef60d92b172e090538ad193e395595f52a461400a5d013ea3660b3', 
        field1: 440,
      }),
    ],
    'handleBlock',
  );
