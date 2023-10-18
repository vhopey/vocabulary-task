export const getRandomLetters = (str: string): Array<string> => {
  //str.split("") & Math.random(words);
  const result = str.split("");
  // console.log(result);
  return result;
};

export const getRandomWords = (words: Array<string>): Array<string> => {
  //Math.random(words).slice(0, 6);
  return words.slice(0, 6);
};