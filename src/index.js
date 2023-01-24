import "./css/base.css";
import { Task, taskList } from "./js/models";
import { appNodes } from "./js/nodes";
import {
  getStoredTasks,
  newTaskCard,
  renderTaskList,
  saveLikeMyApp,
  showToDoContainer,
  taskCounter,
} from "./js/utils";
import { navegator } from "./js/navegation";

window.addEventListener("load", () => {
  let numberOfTasks = taskList.length;
  if (!numberOfTasks) {
    showToDoContainer(false);
  } else {
    renderTaskList(taskList);
    taskCounter();
    saveLikeMyApp();
  }
});

window.addEventListener("load", navegator, false);
window.addEventListener("hashchange", navegator, false);

appNodes.mainInput.addEventListener("keydown", (e) => {
  let keydown = e.keyCode;
  let text = appNodes.mainInput.value.trim();
  if (keydown === 13) {
    if (!text) {
      appNodes.clearMainInput();
    } else {
      let newTask = new Task(text);
      newTask.addTask();
      appNodes.clearMainInput();
      newTaskCard(newTask);
      showToDoContainer(true);
      taskCounter();
      saveLikeMyApp();
    }
  }
  if (keydown === 27) {
    appNodes.clearMainInput();
  }
});

appNodes.clearBtn.addEventListener("click", () => {
  let taskList = getStoredTasks();
  taskList.forEach((task) => {
    if (task.completed) {
      window.localStorage.removeItem(task.id);
    }
  });
  appNodes.toDoList.innerHTML = "";
  let newTaskList = getStoredTasks();
  newTaskList.length ? renderTaskList(newTaskList) : showToDoContainer(false);
  taskCounter();
  saveLikeMyApp();
});
