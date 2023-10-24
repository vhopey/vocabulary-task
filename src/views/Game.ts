import { model } from "../model";
import { dataController, gameController } from "../controllers";
import { Button } from "./components/Button";
import { getElementById } from "../utils";
import { ElementsIdsEnum } from "../types";

const listenerTagName = "BUTTON";

export const Game = {
  init() {
    const letters = getElementById(ElementsIdsEnum.letters);

    letters.addEventListener("click", this.letterClickListener);
    document.addEventListener("keydown", this.letterKeyboardListener);
    // check close page
    window.addEventListener("beforeunload", () => {
      dataController.saveDataToLocalStorage();
    });
  },

  letterClickListener(event: Event) {
    const letters = getElementById(ElementsIdsEnum.letters);
    const target = event.target as HTMLElement; // fix

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target);

      if (model.errors[model.data.currentWord.word] >= 3) {
        gameController.showAnswer();
      } else if (Array.from(letters.childNodes).length === 0) {
        dataController.setAnswers();
        gameController.nextLevel();
      }
    }
  },

  letterKeyboardListener(event: KeyboardEvent) {
    const letters = getElementById(ElementsIdsEnum.letters);
    const target = gameController.findTargetByKey(event.key);

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target);
    } else {
      gameController.pushError(null);
    }

    if (model.errors[model.data.currentWord.word] >= 3) {
      gameController.showAnswer();
    } else if (Array.from(letters.childNodes).length === 0) {
      dataController.setAnswers();
      gameController.nextLevel();
    }
  },

  render() {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const questionNumber = getElementById(ElementsIdsEnum.questionNumber);

    questionNumber.innerHTML = (model.data.numberOfQuestion + 1).toString();
    dataController.setCurrentWord();
    answers.innerHTML = "";

    for (const item of model.data.currentWord.randomizeWord) {
      letters.innerHTML += Button(item);
    }
  },
};
