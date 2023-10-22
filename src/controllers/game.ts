import { model, errors } from "../model";
import { dataController } from "./data";
import { Button, Game, Statistic } from "../views";
import { createElement } from "../utils/createElement";
import { ButtonsEnum } from "../types";

export const gameController = {
  init() {
    Game.init();
    Game.render();
  },
  //move to utils
  getBlockById(id: string): HTMLElement {
    let block = document.getElementById(id);

    if (!block) {
      block = createElement(id, "div");
    }

    return block;
  },

  checkAnswer(target: HTMLElement) {
    const answers = this.getBlockById("answer");

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
    const answers = this.getBlockById("answer");
    const letters = this.getBlockById("letters");
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
    // add find target
    return null;
  },

  pushAnswer(target: HTMLElement) {
    const answers = this.getBlockById("answer");

    const correctLetter = model.currentWord.nextLetter;
    target.classList.add(ButtonsEnum.success);
    target.remove();
    answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
  },
};
