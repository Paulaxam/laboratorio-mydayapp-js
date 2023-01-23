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
    window.localStorage.setItem(this.id, stringifyTask);
  }
}
