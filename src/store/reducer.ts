import { RootState, ActionType } from './store';

// List of action types
export const ACTIONS = {
  ADD_ERROR: "ADD_ERROR",
  ADD_ANSWER: "ADD_ANSWER",
  SET_CURRENT_WORD: "SET_CURRENT_WORD",
  SET_NEXT_LETTER: "SET_NEXT_LETTER",
  SET_MAX_ERR_WORD: "SET_MAX_ERR_WORD",
};

export const reducer = (state: RootState, action: ActionType) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch(action.type) {
    case ACTIONS.ADD_ERROR:
      return { ...newState, errors: newState.errors + 1 };
    case ACTIONS.ADD_ANSWER:
      return { ...newState, answers: newState.answers + 1 };
    case ACTIONS.SET_CURRENT_WORD:
      return { ...newState, currentWord: { ...newState.currentWord, word: action.payload } };
    case ACTIONS.SET_NEXT_LETTER:
      return { ...newState, currentWord: { ...newState.currentWord, nextLetter: action.payload } };
    case ACTIONS.SET_MAX_ERR_WORD:
      return { ...newState, maxErrorsWord: action.payload };
    default:
      return newState;
  }
};