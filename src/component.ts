import Component, { Props, State } from "./component";
import createElement from "./element";

type Constructor<T = {}> = new (...args: any[]) => T;

function ComponentMixin<T extends Constructor<HTMLElement>>(Base: T) {
  return class extends Base implements Component<Props, State> {
    props: Readonly<Props> = {};
    state: Readonly<State> = {} as State;

    constructor(...args: any[]) {
      super(...args);
      this.state = {} as State;
    }

    setState(newState: Partial<State>): void {
      this.state = { ...this.state, ...newState } as State;
      this.render();
    }

    render(): HTMLElement {
      throw new Error("Not implemented");
    }
  };
}

function createCustomElement<T extends Constructor<HTMLElement>>(
  tag: string,
  component: T
) {
  const CustomElement = class extends ComponentMixin(component) {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
      this.render();
    }
  };

  customElements.define(tag, CustomElement);

  return CustomElement;
}

class MyComponentImpl extends Component<Props, State> {
  props: Readonly<Props> = {};
  state: Readonly<State> = { count: 0 };

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

interface MyComponent extends MyComponentImpl {}

const MyComponent = createCustomElement("my-component", MyComponentImpl);

export default MyComponent;
