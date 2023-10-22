import { model } from "../model";
import { Game } from "./Game";
import { dataController, gameController } from "../controllers";
import { getElementById } from "../utils/domManipulation";
import { ElementsIds } from "../types";

export const Statistic = {
  init() {
    const statistic = getElementById(ElementsIds.statistic);
    const gameBlock = getElementById(ElementsIds.gameContainer);
    const letters = getElementById(ElementsIds.letters);

    letters.removeEventListener("click", Game.letterClickListener);
    document.removeEventListener("keydown", Game.letterKeyboardListener);

    dataController.setStatistic();
    gameBlock.classList.add("hidden");
    statistic.classList.remove("hidden");
    statistic.innerHTML += `${Statistic.render()}`;
  },

  tryAgainListening() {
    const tryAgainButton = getElementById(ElementsIds.tryAgainButton);
    tryAgainButton.addEventListener("click", gameController.tryAgain);
  },

  render() {
    return `<div class="lead mb-1 statistic">
      <h2 class="mb-5">Statistic</h2>
      <span> Answers: ${model.answers} </span>
      <span> Errors: ${model.errors} </span>
      <span>${
        model.maxErrorsWord?.length
          ? `The most errors word: ${model.maxErrorsWord}`
          : ""
      }  </span>
      <button type="button" id="try_again_btn" class="btn btn-lg try_again_btn"> Try again </button>
    </div>
    `;
  },
};
