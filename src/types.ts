export type MockDataType = Array<string>;
export type Word = Array<string>;
export type ListWords = Array<Word>;

export type ConfigType = {
  maxErrors: number;
  questions: number;
};

export type StateType = {
  errors: number;
  answers: number;
  countOfWord: number;
  currentWord: {
    word: Word;
    nextLetter: string;
    errors: number;
  };
  maxErrorsWord: string;
};

export enum ButtonsEnum {
  primary = "btn-primary",
  success = "btn-success",
  error = "btn-danger"
};