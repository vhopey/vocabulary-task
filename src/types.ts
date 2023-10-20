export type MockDataType = Array<string>;
export type Word = Array<string>;
export type ListWords = Array<{
  word: string;
  randomizeWord: Array<string>;
}>;

export type ConfigType = {
  maxErrors: number;
  questions: number;
};

export type StateType = {
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
};

export enum ButtonsEnum {
  primary = "btn-primary",
  success = "btn-success",
  error = "btn-danger"
};