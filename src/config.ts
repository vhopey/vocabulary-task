import { MockDataType, ConfigType, StateType } from './types';

// export const mockData: MockDataType = [
//   "apple",
//   "function",
//   "timeout",
//   "task",
//   "application",
//   "data",
//   "tragedy",
//   "sun",
//   "symbol",
//   "button",
//   "software"
// ];

// delete
export const mockData: MockDataType = [
  "task",
  "data",
  "sun",
  "puk",
  "keke"
];

export const config: ConfigType = {
  maxErrors: 3,
  questions: 2
};

export const state: StateType = {
  errors: 0,
  answers: 0,
  countOfWord: 0,
  words: [],
  currentWord: {
    word: '',
    randomizeWord: [],
    nextLetter: ''
  },
  maxErrorsWord: ''
};

// fix
export const errors: any = {};
