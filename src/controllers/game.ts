import { model, errors } from "../model";
import { dataController } from "./data";
import { Button, Game, Statistic } from "../views";
import { getElementById } from "../utils/domManipulation";
import { ButtonsEnum, ElementsIds } from "../types";

export const gameController = {
  init() {
    Game.init();
    Game.render();
  },

  checkAnswer(target: HTMLElement) {
    const answers = getElementById(ElementsIds.answers);

    if (target.innerText === model.currentWord.nextLetter) {
      this.pushAnswer(target);
      dataController.setNextLetter(answers.childNodes.length);
    } else {
      this.pushError(target);
    }
  },

  nextLevel() {
    dataController.setCountOfWord();

    if (model.words[model.countOfWord]) {
      Game.render();
    } else {
      Statistic.init();
      Statistic.render();
      Statistic.tryAgainListening();
    }
  },

  showAnswer() {
    const letters = getElementById(ElementsIds.letters);
    const answers = getElementById(ElementsIds.answers);
    const word = model.currentWord.word;

    //move to game view => render answer?
    answers.innerHTML = `${word
      .split("")
      .map((item) => Button(item, ButtonsEnum.error))
      .join("")}`;
    letters.innerHTML = "";

    setTimeout(() => {
      this.nextLevel();
    }, 4000);
  },

  pushError(target: HTMLElement | null) {
    const word = model.currentWord.word;

    if (target) {
      target.classList.add(ButtonsEnum.error);
      setTimeout(() => {
        target.classList.remove(ButtonsEnum.error);
      }, 500);
    }

    if (errors.hasOwnProperty(word)) {
      errors[word] = errors[word] + 1;
    } else {
      errors[word] = 1;
    }
  },

  findTargetByKey(key: string): HTMLElement | null {
    const lettersChilds = Array.from(
      getElementById(ElementsIds.letters).childNodes,
    );

    for (const item of lettersChilds) {
      const formatStr = item.textContent?.replace(/\s/g, "");

      if (formatStr === key) {
        return item as HTMLElement;
      }
    }

    return null;
  },

  pushAnswer(target: HTMLElement) {
    const answers = getElementById(ElementsIds.answers);

    const correctLetter = model.currentWord.nextLetter;
    target.classList.add(ButtonsEnum.success);
    target.remove();
    answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
  },

  tryAgain() {
    const gameBlock = getElementById(ElementsIds.gameContainer);
    const statistic = getElementById(ElementsIds.statistic);

    dataController.clearAll();
    dataController.init();
    gameController.init();
    statistic.innerHTML = "";
    statistic.classList.add("hidden");
    gameBlock.classList.remove("hidden");
  },
};
