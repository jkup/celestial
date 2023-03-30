import render from "./render";
import MyComponent from "./my-component";

const container = document.getElementById("app") as HTMLElement;
render(new MyComponent(), container);
