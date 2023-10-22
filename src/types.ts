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

export enum ButtonsEnum {
  primary = "btn-primary",
  success = "btn-success",
  error = "btn-danger",
}

export type BlocksType = {
  letters: HTMLElement | null;
  answers: HTMLElement | null;
  questionNumber: HTMLElement | null;
  statistic: HTMLElement | null;
};

export enum ElementsIds {
  letters = "letters",
  answers = "answer",
  statistic = "statistic",
  tryAgainButton = "try_again_btn",
  questionNumber = "current_question_number",
  gameContainer = "game",
}
