import { model, errors } from "../model";
import { dataController, gameController } from "../controllers";
import { Button } from "./components/Button";

const listenerTagName = "BUTTON";

export const Game = {
  init() {
    const letters = gameController.getBlockById("letters");

    letters.addEventListener("click", this.letterClickListener);
    document.addEventListener("keydown", this.letterKeyboardListener);
  },

  letterClickListener(event: Event) {
    const letters = gameController.getBlockById("letters");
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

  letterKeyboardListener(event: KeyboardEvent) {
    const letters = gameController.getBlockById("letters");
    const target = gameController.findTargetByKey(event.key);

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target);

      if (
        letters.childNodes.length === 0 ||
        errors[model.currentWord.word] >= 3
      ) {
        gameController.nextLevel();
      }
    } else {
      gameController.pushError(target);
    }
  },

  render() {
    const letters = gameController.getBlockById("letters");
    const answers = gameController.getBlockById("answer");
    const numberOfQuestion = gameController.getBlockById("current_question");

    numberOfQuestion.innerHTML = (model.countOfWord + 1).toString();
    dataController.setCurrentWord();
    answers.innerHTML = "";

    for (const item of model.currentWord.randomizeWord) {
      letters.innerHTML += Button(item);
    }
  },
};
