import { domSelector } from "./utils";

export const appNodes = {
  mainInput: domSelector(".new-todo"),
  clearMainInput: () => {
    appNodes.mainInput.value = "";
    appNodes.mainInput.removeAttribute("placeholder");
    appNodes.mainInput.setAttribute("autofocus", "autofocus");
  },
  main: domSelector("#main"),
  footer: domSelector("#footer"),
  toDoContainer: domSelector(".todoapp-wrapper"),
  toDoList: domSelector(".todo-list"),
  counter: domSelector("#counter"),
  clearBtn: domSelector(".clear-completed"),
  all: domSelector("#all"),
  pending: domSelector("#pending"),
  completed: domSelector("#completed"),
  itemCounter: domSelector("#item"),
};
