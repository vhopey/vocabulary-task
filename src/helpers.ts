import { state, errors } from "./config";
import { Word } from "./types";

export const getRandomizeArray = (arr: Array<string>) => {
  let currentIndex = arr.length;
  let randomIndex = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

export const getStatistic = () => {
  state.errors = Object.keys(errors).length;
};

export const setCountOfWord = () => {
  state.countOfWord = state.countOfWord + 1;
};

export const setCurrentWord = (
  word: string,
  randomizeWord: Word,
  nextLetter: string,
) => {
  state.currentWord = {
    word,
    randomizeWord,
    nextLetter,
  };
};

export const setNextLetter = (position: number) => {
  state.currentWord.nextLetter = state.currentWord.word[position];
};

export const setAnswers = () => {
  state.answers += 1;
};
