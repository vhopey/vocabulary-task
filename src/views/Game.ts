import { model, errors } from "../model";
import { dataController, gameController } from "../controllers";
import { Button } from "./components/Button";
import { getBlockById } from "../utils/domManipulation";

const listenerTagName = "BUTTON";

export const Game = {
  init() {
    const letters = getBlockById("letters");

    letters.addEventListener("click", this.letterClickListener);
    document.addEventListener("keydown", this.letterKeyboardListener);
  },

  letterClickListener(event: Event) {
    const letters = getBlockById("letters");
    const target = event.target as HTMLElement; // fix

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target);

      if (errors[model.currentWord.word] >= 3) {
        gameController.showAnswer();
      } else if (Array.from(letters.childNodes).length === 0) {
        dataController.setAnswers();
        gameController.nextLevel();
      }
    }
  },
  //check it
  letterKeyboardListener(event: KeyboardEvent) {
    const letters = getBlockById("letters");
    const target = gameController.findTargetByKey(event.key);
    const isMaxErr = errors[model.currentWord.word] >= 3;

    if (!target) {
      gameController.pushError(null);
    }

    if (isMaxErr) {
      gameController.showAnswer();
    }

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target);

      if (isMaxErr) {
        gameController.showAnswer();
      } else if (Array.from(letters.childNodes).length === 0) {
        dataController.setAnswers();
        gameController.nextLevel();
      }
    }
  },

  render() {
    const letters = getBlockById("letters");
    const answers = getBlockById("answer");
    const numberOfQuestion = getBlockById("current_question");

    numberOfQuestion.innerHTML = (model.countOfWord + 1).toString();
    dataController.setCurrentWord();
    answers.innerHTML = "";

    for (const item of model.currentWord.randomizeWord) {
      letters.innerHTML += Button(item);
    }
  },
};
