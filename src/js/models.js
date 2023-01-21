import { idGenerator, storeLocally } from "./utils";
import { getStoredTasks } from "./utils";

export let taskList = getStoredTasks();

export class Task {
  constructor(txt) {
    this.id = idGenerator.next().value;
    this.title = txt;
    this.completed = false;
  }

  addTask() {
    taskList.push({
      id: this.id,
      title: this.title,
      completed: this.completed,
    });
  }

  removeTask(id) {
    const taskIndex = taskList.findIndex((element) => {
      element.id === id;
    });
    taskList.splice(taskIndex, 1);
    storeLocally();
  }

  editTask(id, text) {
    const taskIndex = taskList.findIndex((element) => {
      element.id === id;
    });
    let newTask = taskList[taskIndex];
    newTask.title = text;
    taskList.splice(taskIndex, 1, newTask);
    storeLocally();
  }
}
