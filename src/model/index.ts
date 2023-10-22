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
  }
};

export const model: ModelInterface = {
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
  }
};

// fix
export const errors: any = {};
