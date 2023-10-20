import { start } from './game';
import { mockData, config, state } from "./config";
import { getRandomizeArray } from './helpers';

import { ListWords, MockDataType } from './types';

const getData = (words: MockDataType): void => {
  const result: ListWords = [];
  const randomWords = getRandomizeArray(words).splice(0, config.questions);

  for (const item of randomWords) {
    let randomizeWord = item.split("");

    while(randomizeWord.join('') === item) {
      randomizeWord = getRandomizeArray(item.split(""));
    }
    
    result.push({ word: item, randomizeWord });
  }

  state.words = result;
};

const main = (): void => {
  getData(mockData);
  start();
};

main();