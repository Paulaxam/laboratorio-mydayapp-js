import { domSelector } from "./utils";

export const appNodes = {
  mainInput: domSelector(".new-todo"),
  clearMainInput: () => {
    appNodes.mainInput.value = "";
  },
  main: domSelector("section.main"),
  footer: domSelector(".footer"),
  toDoContainer: domSelector(".todoapp-wrapper"),
  toDoList: domSelector(".todo-list"),
};
