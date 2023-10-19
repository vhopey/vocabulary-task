import { ButtonsEnum } from '../types';

const Button = (letter: string, type: ButtonsEnum = ButtonsEnum.primary): string => {
  return `<button type="button" class="btn ${ type } btn-lg letter_button"> ${ letter } </button>`
}

export default Button;