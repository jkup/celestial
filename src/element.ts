type Attributes = Record<string, string | number>;

type Child = string | HTMLElement;

function createElement(
  tagName: string,
  attributes: Attributes = {},
  ...children: Child[]
): HTMLElement {
  const element = document.createElement(tagName);

  for (let key in attributes) {
    element.setAttribute(key, attributes[key].toString());
  }

  for (let child of children) {
    if (typeof child === "string") {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  }

  return element;
}

export default createElement;
