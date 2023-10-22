import { model, errors } from "../model";
import { dataController } from "./data";
import { Button, Game, Statistic } from "../views";
import { getBlockById } from "../utils/domManipulation";
import { ButtonsEnum } from "../types";

export const gameController = {
  init() {
    Game.init();
    Game.render();
  },

  checkAnswer(target: HTMLElement) {
    const answers = getBlockById("answer");

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
    }
  },

  showAnswer() {
    const letters = getBlockById("letters");
    const answers = getBlockById("answer");
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
    const lettersChilds = Array.from(getBlockById("letters").childNodes);

    for (const item of lettersChilds) {
      const formatStr = item.textContent?.replace(/\s/g, "");

      if (formatStr === key) {
        return item as HTMLElement;
      }
    }

    return null;
  },

  pushAnswer(target: HTMLElement) {
    const answers = getBlockById("answer");

    const correctLetter = model.currentWord.nextLetter;
    target.classList.add(ButtonsEnum.success);
    target.remove();
    answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
  },
};
