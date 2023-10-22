export const createElement = (id: string, type: string): HTMLElement => {
  const element = document.createElement(type);
  element.setAttribute("id", id);
  document.body.appendChild(element);

  return element;
};
