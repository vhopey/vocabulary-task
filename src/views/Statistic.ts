import { model } from "../model";
import { dataController, gameController } from "../controllers";

export const Statistic = {
  init() {
    const statistic = gameController.getBlockById("statistic");
    const gameBlock = gameController.getBlockById("game");

    // костыль
    dataController.getStatistic();
    gameBlock.remove();
    statistic.classList.remove("hidden_block");
    statistic.innerHTML += `${Statistic.render()}`;
  },

  render() {
    return `<div>
      Answers: ${model.answers},
      Errors: ${model.errors}
      ${model.maxErrorsWord && `,Maximum erorrs word: ${model.maxErrorsWord}`}
    </div>`;
  },
};
