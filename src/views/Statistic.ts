import { Game } from "./Game";
import { dataController, gameController } from "../controllers";
import { getElementById } from "../utils";
import { ElementsIdsEnum } from "../types";

export const Statistic = {
  init() {
    const statistic = getElementById(ElementsIdsEnum.statistic);
    const gameBlock = getElementById(ElementsIdsEnum.gameContainer);
    const letters = getElementById(ElementsIdsEnum.letters);

    letters.removeEventListener("click", Game.letterClickListener);
    document.removeEventListener("keydown", Game.letterKeyboardListener);

    dataController.setStatistic();
    gameBlock.classList.add("hidden");
    statistic.classList.remove("hidden");
    statistic.innerHTML += `${Statistic.render()}`;
  },

  tryAgainListening() {
    const tryAgainButton = getElementById(ElementsIdsEnum.tryAgainButton);
    tryAgainButton.addEventListener("click", gameController.tryAgain);
  },

  render() {
    const { answers, errors, maxErrorsWord } = dataController.getStatistic();

    return `<div class="lead mb-1 statistic">
      <h2 class="mb-5">Statistic</h2>
      <span> Answers: ${answers} </span>
      <span> Errors: ${errors} </span>
      <span>${
        maxErrorsWord?.length ? `The most errors word: ${maxErrorsWord}` : ""
      }  </span>
      <button type="button" id="try_again_btn" class="btn btn-lg try_again_btn"> Try again </button>
    </div>
    `;
  },
};
