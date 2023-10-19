import Button from './components/Button';

import { listener } from './game';
import { mockData, config } from "./config";
import { getRandomizeArray } from './helpers';

import { ListWords, MockDataType, StateType } from './types';

export const state: StateType = {
  errors: 0,
  answers: 0,
  countOfWord: 0,
  currentWord: {
    word: [],
    nextLetter: '',
    errors: 0
  },
  maxErrorsWord: ''
};

const getData = (words: MockDataType): ListWords => {
  const result: ListWords = [];
  const randomWords = getRandomizeArray(words).splice(0, config.questions);

  for (const item of randomWords) {
    result.push(getRandomizeArray(item.split("")));
  }

  return result;
};

const main = (): void => {
  const resultData = getData(mockData);
  const currentWord = resultData[0];
  const letters = document.getElementById("letters");

  if(!letters) {
    return;
  }

  for (const item of currentWord) {
    letters.innerHTML += Button(item)
  }

  listener(currentWord);
};

main();