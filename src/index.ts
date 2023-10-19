import Button from './components/Button';

import { listener } from './game';
import { mockData, config } from "./config";
import { getRandomizeArray } from './helpers';

import { createStore, state } from './store/store';
import { reducer, ACTIONS } from './store/reducer';

import { ListWords, MockDataType } from './types';

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

  const store = createStore(reducer, state);
  store.dispatch({ type: ACTIONS.SET_CURRENT_WORD, payload: resultData[store.getState().countOfWord] });

  const currentWord = store.getState().currentWord.word;
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