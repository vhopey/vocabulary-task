import { model, initialModel } from "../model";
import { config, mockWords } from "../config";
import { getRandomizeArray } from "../utils";
import { MockWordsType, ListWordsType } from "../types";

export const dataController = {
  init(): void {
    model.data.words = this.getData(mockWords);
  },

  getData(words: MockWordsType): ListWordsType {
    const result: ListWordsType = [];
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

  checkSavedData(): boolean {
    const hasSavedData = localStorage.getItem("hasSavedData");

    if(hasSavedData && hasSavedData === "true") {
      return true;
    }

    return false;
  },

  getSavedData(): void {
    const storageModel = localStorage.getItem("model");

    if(storageModel) {
      model.data = JSON.parse(storageModel).data;
      model.statistic = JSON.parse(storageModel).statistic;
    }
  },

  getCurrentWord() {
    return model.data.currentWord;
  },

  getWordList() {
    return model.data.words;
  },

  getNumberOfQuestion() {
    return model.data.numberOfQuestion;
  },

  getStatistic() {
    return model.statistic;
  },

  setStatistic() {
    const errors = model.errors;
    const wordWithError = Object.keys(errors);
    let allErrors = 0;
    let maxErrorsWord = wordWithError[0];

    for (const i of Object.values(errors)) {
      allErrors += i as number;
    }

    for (const word of wordWithError) {
      if (errors[word] > errors[maxErrorsWord]) {
        maxErrorsWord = errors[word];
      }
    }

    model.statistic.errors = allErrors;
    model.statistic.maxErrorsWord = maxErrorsWord;
  },

  setCountOfWord() {
    model.data.numberOfQuestion = model.data.numberOfQuestion + 1;
  },

  setCurrentWord(): void {
    console.log(model.data.words, model.data.numberOfQuestion);
    const currentWord = model.data.words[model.data.numberOfQuestion];
    model.data.currentWord = {
      word: currentWord.word,
      randomizeWord: currentWord.randomizeWord,
      nextLetter: currentWord.word[0],
    };
  },

  setNextLetter(position: number): void {
    const currentWord = model.data.words[model.data.numberOfQuestion];
    model.data.currentWord.nextLetter = currentWord.word[position];
  },

  setAnswers(): void {
    model.statistic.answers += 1;
  },

  saveDataToLocalStorage(): null {
    window.localStorage.setItem("model", JSON.stringify(model));
    window.localStorage.setItem("hasSavedData", "true");

    return null;
  },

  clearAll(): void {
    model.data = JSON.parse(JSON.stringify(initialModel.data));
    model.statistic = JSON.parse(JSON.stringify(initialModel.statistic));
    model.errors = {};
    localStorage.clear();
  },
};
