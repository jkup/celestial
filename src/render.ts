import createElement from "./element";

function render(component: HTMLElement, container: HTMLElement): void {
  const element = component.render();
  container.appendChild(element);
}

export default render;
