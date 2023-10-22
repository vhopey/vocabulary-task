import { ListWordsType, WordType } from "../types";

interface IModel {
  errors: number;
  answers: number;
  countOfWord: number;
  words: ListWordsType;
  currentWord: {
    word: string;
    randomizeWord: WordType;
    nextLetter: string;
  };
  maxErrorsWord: string;
}

export const model: IModel = {
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
