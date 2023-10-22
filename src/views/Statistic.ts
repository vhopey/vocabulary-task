import { model } from "../model";
import { Game } from "./Game";
import { dataController, gameController } from "../controllers";
import { getBlockById } from "../utils/domManipulation";

export const Statistic = {
  init() {
    const statistic = getBlockById("statistic");
    const gameBlock = getBlockById("game");

    removeEventListener("click", Game.letterClickListener);
    removeEventListener("keydown", Game.letterKeyboardListener);

    dataController.setStatistic();
    gameBlock.remove();
    statistic.classList.remove("hidden_block");
    statistic.innerHTML += `${Statistic.render()}`;
  },

  tryAgain() {
    dataController.clearAll();
    dataController.init();
    gameController.init();
  },

  render() {
    return `<div class="lead mb-1 statistic">
      <span> Answers: ${model.answers} </span>
      <span> Errors: ${model.errors} </span>
      <span>${
        model.maxErrorsWord?.length
          ? `The most errors word: ${model.maxErrorsWord}`
          : ""
      }  </span>
    </div>
    <button type="button" id="try-again-btn" class="btn btn-lg "> Try again </button>
    `;
  },
};
