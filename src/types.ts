export type MockWordsType = Array<string>;
export type WordType = Array<string>;
export type ListWordsType = Array<{
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

export enum ElementsIdsEnum {
  letters = "letters",
  answers = "answer",
  statistic = "statistic",
  tryAgainButton = "try_again_btn",
  questionNumber = "current_question_number",
  gameContainer = "game",
  questionsNumbers = "questions_numbers",
}
