import "./css/base.css";
import { Task, taskList } from "./js/models";
import { appNodes } from "./js/nodes";
import {
  getStoredTasks,
  newTaskCard,
  renderTaskList,
  showToDoContainer,
  taskCounter,
} from "./js/utils";

window.addEventListener("load", () => {
  let numberOfTasks = taskList.length;
  if (!numberOfTasks) {
    showToDoContainer(false);
  } else {
    renderTaskList(taskList);
    taskCounter();
  }
});

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
});
