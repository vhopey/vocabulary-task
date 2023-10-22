import { MockDataType } from "./types";

export type ConfigType = {
  maxErrors: number;
  questions: number;
};

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
export const mockWords: MockDataType = ["task", "data", "sun", "puk", "keke"];

export const config: ConfigType = {
  maxErrors: 3,
  questions: 2,
};
