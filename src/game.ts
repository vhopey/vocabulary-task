import { Word, ButtonsEnum } from "./types";
import Button from "./components/Button";
// Logic
/**
  if it's not correct word that red & errors push 1
  if ok - put inside answer
  if letters.length = 0 than next quest and push result
  + keyboard events
  if errors = 3 than view answer & red buttons
  timeout and next quest
  put all in statistic:
    1) count of words without errors
    2) count of errors
    3) word with a lot errors
*/

const listenerTagName = "BUTTON";

// add keyboard listener
export const listener = (correctWord: Word) => {
  const lettersBlock = document.getElementById("letters");

  if(!lettersBlock) {
    return;
  }

  lettersBlock.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const answerBlock = document.getElementById("answer");

    if(target && target.tagName === listenerTagName && answerBlock) {      
      if(target.innerText === correctWord[0]) {
        target.classList.add(ButtonsEnum.success);
        answerBlock.innerHTML = Button(correctWord[0], ButtonsEnum.success);
      } else {
        target.classList.add(ButtonsEnum.error);
      };
    }
  })
}