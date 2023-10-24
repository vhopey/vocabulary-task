import { MockWordsType } from "./types";

export type ConfigType = {
  maxErrors: number;
  questions: number;
};

export const mockWords: MockWordsType = [
  "apple",
  // "function",
  // "timeout",
  "task",
  // "application",
  "data",
  // "tragedy",
  "sun",
  // "symbol",
  // "button",
  // "software",
];

export const config: ConfigType = {
  maxErrors: 3,
  questions: 2, // change before push
};
