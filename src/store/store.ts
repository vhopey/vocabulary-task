import { StateType, Word } from "../types";

export type RootState = StateType;
export type ActionType = {
  type: string,
  payload?: Word
};
export type AppDispatch = (arg0: ActionType) => StateType;
export type Reducer = (state: StateType, action: ActionType) => StateType;

export const state: RootState = {
  errors: 0,
  answers: 0,
  countOfWord: 0,
  currentWord: {
    word: [],
    nextLetter: '',
    errors: 0
  },
  maxErrorsWord: ''
};

export const createStore = (reducer: Reducer, initialState: RootState) => {
  let currentState = initialState;
  
  return {
    getState: () => currentState,
    dispatch: (action: ActionType) => {
      currentState = reducer(currentState, action);
    }
  };
};


