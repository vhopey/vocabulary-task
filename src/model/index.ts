import { ListWordsType, WordType } from "../types";

interface ModelInterface {
  data: {
    words: ListWordsType;
    currentWord: {
      word: string;
      randomizeWord: WordType;
      nextLetter: string;
    };
    numberOfQuestion: number;
  },
  statistic: {
    errors: number;
    answers: number;
    maxErrorsWord: string;
  },
  errors: {}
};

export const initialModel: ModelInterface = {
  data: {
    words: [],
    currentWord: {
      word: "",
      randomizeWord: [],
      nextLetter: "",
    },
    numberOfQuestion: 0,
  },
  statistic: {
    errors: 0,
    answers: 0,
    maxErrorsWord: ""
  },
  errors: {}
};

export const model = JSON.parse(JSON.stringify(initialModel));

