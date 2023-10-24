import { dataController, gameController } from "../controllers";
import { Button } from "./components/Button";
import { getElementById } from "../utils";
import { ElementsIdsEnum, ButtonsEnum } from "../types";

const listenerTagName = "BUTTON";

export const Game = {
  init() {
    const letters = getElementById(ElementsIdsEnum.letters);

    letters.addEventListener("click", this.letterClickListener);
    document.addEventListener("keydown", this.letterKeyboardListener);
  },

  letterClickListener(event: Event) {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const target = event.target as HTMLElement; // fix

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target, answers);

      if (dataController.errorsList[dataController.currentWord.word] >= 3) {
        gameController.showAnswer();
      } else if (Array.from(letters.childNodes).length === 0) {
        gameController.addAnswer();
        gameController.nextLevel();
      }
    }
  },

  letterKeyboardListener(event: KeyboardEvent) {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const target = gameController.findTargetByKey(event.key, letters);

    if (target && target.tagName === listenerTagName) {
      gameController.checkAnswer(target, answers);
    } else {
      gameController.pushError(null);
    }

    if (dataController.errorsList[dataController.currentWord.word] >= 3) {
      gameController.showAnswer();
    } else if (Array.from(letters.childNodes).length === 0) {
      gameController.addAnswer();
      gameController.nextLevel();
    }
  },

  pushLetterInContainer(target: HTMLElement): void {
    const answers = getElementById(ElementsIdsEnum.answers);
    const { nextLetter: correctLetter } = dataController.currentWord;

    target.classList.add(ButtonsEnum.success);
    target.remove();
    answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
  },

  renderAnswer() {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const word = dataController.currentWord.word;

    answers.innerHTML = `${word
      .split("")
      .map((item: string) => Button(item, ButtonsEnum.error))
      .join("")}`;
    letters.innerHTML = "";
  },

  render() {
    const letters = getElementById(ElementsIdsEnum.letters);
    const answers = getElementById(ElementsIdsEnum.answers);
    const questionNumber = getElementById(ElementsIdsEnum.questionNumber);

    questionNumber.innerHTML = (dataController.numberOfQuestion + 1).toString();
    const currentWord =
      dataController.wordList[dataController.numberOfQuestion];
    dataController.currentWord = currentWord;
    answers.innerHTML = "";

    for (const item of dataController.currentWord.randomizeWord) {
      letters.innerHTML += Button(item);
    }
  },
};
