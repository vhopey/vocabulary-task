import { mockData } from "./mock";
import { getRandomWords, getRandomLetters } from './helpers';

const getData = (words: Array<string>): string[][] => {
  const result: Array<Array<string>> = [];
  const randomWords = getRandomWords(words);
  for (const item of randomWords) {
    result.push(getRandomLetters(item));
  }
  return result;
};

const resultData = getData(mockData);

const renderLetters = () => {
  //render each letter button
};

const logic = () => {
  // if it's not correct word that red & errors push 1
  // if ok - put inside answer
  // if letters.length = 0 than next quest and push result
  // + keyboard events
  // if errors = 3 than view answer & red buttons
  // timeout and next quest
  // put all in statistic:
  // 1) count of words without errors
  // 2) count of errors
  // 3) word with a lot errors
};

const main = () => {
  const theFirst = resultData[0];
  const letters = document.getElementById("letters");

  if(!letters) {
    return null;
  }
  letters.innerHTML = `<button
  onClick="${onClickLetter}"> ${theFirst[0]} </button>`;

  return;
};

main();