import { ListWords, Word } from "../types";

interface ModelType {
  errors: number;
  answers: number;
  countOfWord: number;
  words: ListWords;
  currentWord: {
    word: string;
    randomizeWord: Word;
    nextLetter: string;
  };
  maxErrorsWord: string;
}

export const model: ModelType = {
  errors: 0,
  answers: 0,
  countOfWord: 0,
  words: [],
  currentWord: {
    word: "",
    randomizeWord: [],
    nextLetter: "",
  },
  maxErrorsWord: "",
};

// fix
export const errors: any = {};
