import Component from "./component";
import createElement from "./element";

interface Props {}

interface State {
  count: number;
}

class MyComponent extends HTMLElement implements Component<Props, State> {
  props: Readonly<Props> = {};
  state: Readonly<State> = { count: 0 };

  connectedCallback(): void {
    this.render();
  }

  handleClick(): void {
    this.setState({ count: this.state.count + 1 });
  }

  render(): HTMLElement {
    const element = createElement(
      "div",
      { class: "my-component" },
      createElement("h1", null, `Count: ${this.state.count}`),
      createElement(
        "button",
        { onClick: () => this.handleClick() },
        "Increment"
      )
    );

    return element;
  }
}

export default MyComponent;
