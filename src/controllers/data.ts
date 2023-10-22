import { model, errors } from "../model";
import { config, mockWords } from "../config";
import { getRandomizeArray } from "../utils/randomize";
import { MockDataType, ListWords } from "../types";

export const dataController = {
  init() {
    model.words = this.getData(mockWords);
  },

  getData(words: MockDataType): ListWords {
    const result: ListWords = [];
    const randomWords = getRandomizeArray(words).splice(0, config.questions);

    for (const item of randomWords) {
      let randomizeWord = item.split("");

      while (randomizeWord.join("") === item) {
        randomizeWord = getRandomizeArray(item.split(""));
      }

      result.push({ word: item, randomizeWord });
    }

    return result;
  },

  setStatistic() {
    const wordWithError = Object.keys(errors);
    let allErrors = 0;
    let maxErrorsWord = wordWithError[0];

    for (const i of Object.values(errors)) {
      allErrors += i as number;
    }

    for (const word of wordWithError) {
      //if  = than which word?
      if (errors[word] > errors[maxErrorsWord]) {
        maxErrorsWord = errors[word];
      }
    }

    model.errors = allErrors;
    model.maxErrorsWord = maxErrorsWord;
  },

  setCountOfWord() {
    model.countOfWord = model.countOfWord + 1;
  },

  setCurrentWord() {
    model.currentWord = {
      word: model.words[model.countOfWord].word,
      randomizeWord: model.words[model.countOfWord].randomizeWord,
      nextLetter: model.words[model.countOfWord].word[0],
    };
  },

  setNextLetter(position: number) {
    model.currentWord.nextLetter = model.currentWord.word[position];
  },

  setAnswers() {
    model.answers += 1;
  },

  clearAll() {
    model.countOfWord = 0;
    model.errors = 0;
    model.answers = 0;
    model.maxErrorsWord = "";
  },
};
