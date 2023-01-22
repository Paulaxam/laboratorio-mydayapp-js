import { idGenerator } from "./utils";
import { getStoredTasks } from "./utils";

export let taskList = getStoredTasks();

export class Task {
  constructor(txt) {
    this.id = idGenerator.next().value;
    this.title = txt;
    this.completed = false;
  }

  addTask() {
    let stringifyTask = JSON.stringify({
      id: this.id,
      title: this.title,
      completed: this.completed,
    });
    console.log(stringifyTask);
    window.localStorage.setItem(this.id, stringifyTask);
  }

  removeTask(id) {
    window.localStorage.removeItem(id);
  }

  editTask(id, text) {
    let task = JSON.parse(window.localStorage.getItem(id));
    task.title = text;
    window.localStorage.setItem(id, JSON.stringify(task));
  }
}
