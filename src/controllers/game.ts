import { model } from "../model";
import { dataController } from "./data";
import { Button, Game, Statistic, UnsavedChanges } from "../views";
import { getElementById } from "../utils";
import { ButtonsEnum, ElementsIdsEnum } from "../types";

export const gameController = {
  init(): void {
    Game.init();
    Game.render();
    // const hasSavedData = dataController.checkSavedData();

    // if(hasSavedData) {
    //   UnsavedChanges.init;
    //   UnsavedChanges.render;
    // } else {
    //   Game.init();
    //   Game.render();
    // }
  },

  checkAnswer(target: HTMLElement): void {
    const answers = getElementById(ElementsIdsEnum.answers);
    const currentWord = dataController.getCurrentWord();

    if (target.innerText === currentWord.nextLetter) {
      this.pushAnswer(target);
      dataController.setNextLetter(answers.childNodes.length);
    } else {
      this.pushError(target);
    }
  },

  nextLevel(): void {
    dataController.setCountOfWord();
    const words = dataController.getWordList();
    const numberOfQuestion = dataController.getNumberOfQuestion();

    if (words[numberOfQuestion]) {
      Game.render();
    } else {
      Statistic.init();
      Statistic.render();
      Statistic.tryAgainListening();
    }
  },

  showAnswer(): void {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const word = model.data.currentWord.word;

    //move to game view => render answer?
    answers.innerHTML = `${word
      .split("")
      .map((item: string) => Button(item, ButtonsEnum.error))
      .join("")}`;
    letters.innerHTML = "";

    setTimeout(() => {
      this.nextLevel();
    }, 4000);
  },

  pushError(target: HTMLElement | null): void {
    const errors = model.errors;
    const { word: currentWord } = dataController.getCurrentWord();

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

  findTargetByKey(key: string): HTMLElement | null {
    const lettersChilds = Array.from(
      getElementById(ElementsIdsEnum.letters).childNodes,
    );

    for (const item of lettersChilds) {
      const formatStr = item.textContent?.replace(/\s/g, "");

      if (formatStr === key) {
        // fix
        return item as HTMLElement;
      }
    }

    return null;
  },

  pushAnswer(target: HTMLElement): void {
    const answers = getElementById(ElementsIdsEnum.answers);
    const { nextLetter: correctLetter } = dataController.getCurrentWord();

    target.classList.add(ButtonsEnum.success);
    target.remove();
    answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
  },

  tryAgain(): void {
    const gameBlock = getElementById(ElementsIdsEnum.gameContainer);
    const statistic = getElementById(ElementsIdsEnum.statistic);

    dataController.clearAll();
    dataController.init();
    gameController.init();
    statistic.innerHTML = "";
    statistic.classList.add("hidden");
    gameBlock.classList.remove("hidden");
  },
};
