import { ButtonsEnum } from "../../types";

export const Button = (
  letter: string,
  type: ButtonsEnum = ButtonsEnum.primary,
): string => {
  return `<button type="button" class="btn ${type} btn-lg letter_button"> ${letter} </button>`;
};
