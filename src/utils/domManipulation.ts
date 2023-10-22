export const getElementById = (id: string): HTMLElement => {
  let block = document.getElementById(id);

  if (!block) {
    throw new Error("Container doesn't find")
  };

  return block;
};

