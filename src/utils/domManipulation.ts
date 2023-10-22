export const getBlockById = (id: string): HTMLElement => {
  let block = document.getElementById(id);

  if (!block) {
    block = createElement(id, "div");
  }

  return block;
};

const createElement = (id: string, type: string): HTMLElement => {
  const element = document.createElement(type);
  element.setAttribute("id", id);
  document.body.appendChild(element);

  return element;
};
