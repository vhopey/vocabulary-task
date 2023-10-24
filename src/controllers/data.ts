import { model, initialModel } from "../model";
import { fetchWords } from "../service";

export const dataController = {
  init(): void {
    model.data.words = fetchWords();
    this.currentWord = this.wordList[0];
  },

  get currentWord() {
    return model.data.currentWord;
  },

  get wordList() {
    return model.data.words;
  },

  get numberOfQuestion() {
    return model.data.numberOfQuestion;
  },

  get statistic() {
    return model.statistic;
  },

  get answers() {
    return model.statistic.answers;
  },

  get errorsList() {
    return model.errors;
  },

  set statistic(errors) {
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

  set numberOfQuestion(num: number) {
    model.data.numberOfQuestion = num;
  },

  set currentWord(currentWord) {
    model.data.currentWord = {
      word: currentWord.word,
      randomizeWord: currentWord.randomizeWord,
      nextLetter: currentWord.word[0],
    };
  },

  set nextLetter(position: number) {
    const currentWord = model.data.words[model.data.numberOfQuestion];
    model.data.currentWord.nextLetter = currentWord.word[position];
  },

  set answers(num: number) {
    model.statistic.answers = num;
  },

  clearAll(): void {
    model.data = JSON.parse(JSON.stringify(initialModel.data));
    model.statistic = JSON.parse(JSON.stringify(initialModel.statistic));
    model.errors = {};
    localStorage.clear();
  },
};
