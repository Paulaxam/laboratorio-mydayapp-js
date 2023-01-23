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
  counter: domSelector("#counter"),
  clearBtn: domSelector(".clear-completed"),
  all: domSelector("#all"),
  pending: domSelector("#pending"),
  completed: domSelector("#completed"),
};
