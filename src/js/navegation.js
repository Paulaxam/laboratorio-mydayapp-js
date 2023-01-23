import { appNodes } from "./nodes";
import { getStoredTasks, renderTaskList } from "./utils";

export let url = window.location;

export function navegator() {
  let hash = url.hash;
  let taskList = getStoredTasks();
  console.log(window.location.hash);
  if (hash.startsWith("#/pending")) {
    let pendingTasks = [];
    taskList.forEach((task) => {
      if (!task.completed) {
        pendingTasks.push(task);
      }
    });
    appNodes.toDoList.innerHTML = "";
    renderTaskList(pendingTasks);
  } else if (hash.startsWith("#/completed")) {
    let completedTasks = [];
    taskList.forEach((task) => {
      if (task.completed) {
        completedTasks.push(task);
      }
    });
    appNodes.toDoList.innerHTML = "";
    renderTaskList(completedTasks);
  } else if (hash.startsWith("#/")) {
    appNodes.toDoList.innerHTML = "";
    renderTaskList(taskList);
  }
}
