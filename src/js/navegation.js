import { appNodes } from "./nodes";
import { getStoredTasks, renderTaskList } from "./utils";

export let url = window.location;

export function navegator() {
  let hash = url.hash;
  let taskList = getStoredTasks();
  if (hash.startsWith("#/pending")) {
    let pendingTasks = [];
    appNodes.all.classList.remove("selected");
    appNodes.completed.classList.remove("selected");
    appNodes.pending.classList.add("selected");
    taskList.forEach((task) => {
      if (!task.completed) {
        pendingTasks.push(task);
      }
    });
    appNodes.toDoList.innerHTML = "";
    renderTaskList(pendingTasks);
  } else if (hash.startsWith("#/completed")) {
    let completedTasks = [];
    appNodes.all.classList.remove("selected");
    appNodes.completed.classList.add("selected");
    appNodes.pending.classList.remove("selected");
    taskList.forEach((task) => {
      if (task.completed) {
        completedTasks.push(task);
      }
    });
    appNodes.toDoList.innerHTML = "";
    renderTaskList(completedTasks);
  } else if (hash.startsWith("#/")) {
    appNodes.all.classList.add("selected");
    appNodes.completed.classList.remove("selected");
    appNodes.pending.classList.remove("selected");
    appNodes.toDoList.innerHTML = "";
    renderTaskList(taskList);
  }
}
