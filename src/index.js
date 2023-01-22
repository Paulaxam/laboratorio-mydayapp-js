import "./css/base.css";
import { Task, taskList } from "./js/models";
import { appNodes } from "./js/nodes";
import { newTaskCard, showToDoContainer } from "./js/utils";

window.addEventListener("load", () => {
  let numberOfTasks = taskList.length;
  if (!numberOfTasks) {
    showToDoContainer(false);
  } else {
    taskList.forEach((element) => {
      newTaskCard(element);
    });
  }

  console.log(taskList);
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
    }
  }
  if (keydown === 27) {
    appNodes.clearMainInput();
  }
});
