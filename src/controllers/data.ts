import { model, errors } from "../model";
import { config, mockWords } from "../config";
import { getRandomizeArray } from "../utils/randomize";
import { MockDataType, ListWords, Word } from "../types";

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

  getStatistic() {
    model.errors = Object.keys(errors).length;
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
};
