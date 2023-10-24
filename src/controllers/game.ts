import { dataController } from "./data";
import { Game, Statistic } from "../views";
import { ButtonsEnum } from "../types";

export const gameController = {
  init(): void {
    Game.init();
    Game.render();
  },

  addAnswer(): void {
    dataController.answers = dataController.answers + 1;
  },

  pushStatistic(): void {
    dataController.statistic = dataController.errorsList;
  },

  pushError(target: HTMLElement | null): void {
    const errors = dataController.errorsList;
    const { word: currentWord } = dataController.currentWord;

    if (target) {
      target.classList.add(ButtonsEnum.error);
      setTimeout(() => {
        target.classList.remove(ButtonsEnum.error);
      }, 500);
    }

    if (errors.hasOwnProperty(currentWord)) {
      errors[currentWord] = errors[currentWord] + 1;
    } else {
      errors[currentWord] = 1;
    }
  },

  checkAnswer(target: HTMLElement, answerContainer: HTMLElement): void {
    const currentWord = dataController.currentWord;

    if (target.innerText === currentWord.nextLetter) {
      Game.pushLetterInContainer(target);
      dataController.nextLetter = answerContainer.childNodes.length;
    } else {
      this.pushError(target);
    }
  },

  showAnswer() {
    document.removeEventListener("keydown", Game.letterKeyboardListener);
    Game.renderAnswer();

    setTimeout(() => {
      gameController.nextLevel();
      document.addEventListener("keydown", Game.letterKeyboardListener);
    }, 4000);
  },

  checkNextLetter(endWord: boolean) {
    if (dataController.errorsList[dataController.currentWord.word] >= 3) {
      gameController.showAnswer();
    } else if (endWord) {
      gameController.addAnswer();
      gameController.nextLevel();
    }
  },

  nextLevel(): void {
    dataController.numberOfQuestion = dataController.numberOfQuestion + 1;
    const words = dataController.wordList;

    if (words[dataController.numberOfQuestion]) {
      Game.render();
    } else {
      Statistic.init();
      Statistic.render();
      Statistic.tryAgainListening();
    }
  },

  findTargetByKey(
    key: string,
    lettersContainer: HTMLElement,
  ): HTMLElement | null {
    const lettersChilds = Array.from(lettersContainer.childNodes);

    for (const item of lettersChilds) {
      const formatStr = item.textContent?.replace(/\s/g, "");

      if (formatStr === key) {
        // fix
        return item as HTMLElement;
      }
    }

    return null;
  },

  tryAgain(): void {
    dataController.clearAll();
    dataController.init();
    gameController.init();
    Statistic.returnToGame();
  },
};
