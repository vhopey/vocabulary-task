import { ListWordsType } from "./types";
import { config, mockWords } from "./config";
import { getRandomizeArray } from "./utils";

export const fetchWords = (): ListWordsType => {
  const result: ListWordsType = [];
  const randomWords = getRandomizeArray(mockWords).splice(0, config.questions);

  for (const item of randomWords) {
    let randomizeWord = item.split("");

    while (randomizeWord.join("") === item) {
      randomizeWord = getRandomizeArray(item.split(""));
    }

    result.push({ word: item, randomizeWord });
  }

  return result;
};
