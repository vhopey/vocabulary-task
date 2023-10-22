import { getElementById } from "../utils";
import { Button } from "./components/Button";
import { ElementsIdsEnum, ButtonsEnum} from "../types";

export const UnsavedChanges = {
  init() {
    // const questionsNumbers = getElementById(ElementsIdsEnum.questionsNumbers);
    // questionsNumbers.classList.add("hidden");
  },

  render() {
    const game = getElementById(ElementsIdsEnum.gameContainer);

    game.innerHTML = `
      <div>
        <span> У вас есть несохраненные изменения, хотите продолжить на чем остановились? </span>
        <div class="unsavedChanges">
          ${ Button("Да", ButtonsEnum.success)}
          ${ Button("Нет", ButtonsEnum.error)}
        </div>
      </div>
    `
  }
};
