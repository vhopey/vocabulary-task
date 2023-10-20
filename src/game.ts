import { ButtonsEnum } from "./types";
import Button from "./components/Button";
import Statistic from "./components/Statistic";
import { errors, state } from "./config";
import { setNextLetter, setCountOfWord, setCurrentWord, getStatistic, setAnswers } from './helpers';
// Logic
/**
  + if it's not correct word that red & errors push 1
  + if ok - put inside answer
  + if letters.length = 0 than next quest and push result
  - keyboard events
  - if errors = 3 than view answer & red buttons, timeout and next quest
  - put all in statistic:
    + 1) count of words without errors
    + 2) count of errors
    3) word with a lot errors
*/

const listenerTagName = "BUTTON";

const getBlocks = () => ({
  letters: document.getElementById("letters"),
  answers: document.getElementById("answer"),
  numberOfQuestion: document.getElementById("current_question"),
  statistic: document.getElementById("statistic")
});

export const end = () => {
  const { statistic } = getBlocks();
  const gameBlock = document.getElementById("game");

  if(!statistic || !gameBlock) {
    return;
  };

  getStatistic();
  gameBlock.remove();
  statistic.classList.remove("hidden_block");
  statistic.innerHTML += `${Statistic()}`;
};

export const start = () => {
  const { letters, answers, numberOfQuestion } = getBlocks();
  
  if(!letters || !answers || !numberOfQuestion) {
    return;
  }

  numberOfQuestion.innerHTML = (state.countOfWord+1).toString();
  setCurrentWord(state.words[state.countOfWord].word,
    state.words[state.countOfWord].randomizeWord, 
    state.words[state.countOfWord].word[0]);
  answers.innerHTML = '';

  for (const item of state.currentWord.randomizeWord) {
    letters.innerHTML += Button(item)
  }

  listener(state.currentWord.word);
}

const pushError = (word: string) => {
  if(errors.hasOwnProperty(word)) {
    errors[word] = errors[word] + 1;
  } else {
    errors[word] = 1;
  }
};

const letterClickListener = (event: Event) => {
  const { letters, answers } = getBlocks();

  if(!letters || !answers) {
    return;
  };

  const correctLetter = state.currentWord.nextLetter;
  const target = event.target as HTMLElement;

  if(target && target.tagName === listenerTagName) {
    if(target.innerText === correctLetter) {
      target.classList.add(ButtonsEnum.success);
      target.remove();
      answers.innerHTML += Button(correctLetter, ButtonsEnum.success);
      setNextLetter(answers.childNodes.length);
    } else {
      target.classList.add(ButtonsEnum.error);
      setTimeout(()=> {
        target.classList.remove(ButtonsEnum.error);
      }, 500)
      pushError(state.currentWord.word);
    };
  };

  if(letters.childNodes.length === 0 || errors[state.currentWord.word] >= 3) {
    removeEventListener('click', letterClickListener);
    setCountOfWord();

    if(letters.childNodes.length === 0) {
      setAnswers();
    };

    state.words[state.countOfWord] ? start() : end();
  };
};

// add keyboard listener
export const listener = (correctWord: string) => {
  const { letters } = getBlocks();

  if(!letters) {
    return;
  };

  letters.addEventListener("click", letterClickListener);
}