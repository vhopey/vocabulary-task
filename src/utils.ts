export const getElementById = (id: string): HTMLElement => {
  let block = document.getElementById(id);

  if (!block) {
    throw new Error("Container doesn't find");
  }

  return block;
};

export const getRandomizeArray = (arr: Array<string>) => {
  let resultArr = [...arr];
  let currentIndex = arr.length;
  let randomIndex = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [resultArr[currentIndex], resultArr[randomIndex]] = [
      resultArr[randomIndex],
      resultArr[currentIndex],
    ];
  }

  return resultArr;
};
