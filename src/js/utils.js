import { appNodes } from "./nodes";

export function* idGen() {
  let id = Math.round(Math.random() * 1000);
  while (true) {
    yield id.toString();
    id++;
  }
}

export const idGenerator = idGen();

export function renderTaskList(taskList) {
  taskList.forEach((element) => {
    newTaskCard(element);
  });
}

export function domSelector(query) {
  return document.querySelector(query);
}

export function createElement(elem) {
  return document.createElement(elem);
}

export function clearStorage() {
  window.localStorage.clear();
}

export function completedTaskToggle(id) {
  let task = JSON.parse(window.localStorage.getItem(id));
  if (task.completed === false) {
    task.completed = true;
    console.log(task);
    window.localStorage.setItem(id, JSON.stringify(task));
  } else {
    task.completed = false;
    console.log(task);
    window.localStorage.setItem(id, JSON.stringify(task));
  }
}

export function getStoredTasks() {
  let storedTasksObject = { ...window.localStorage };
  let storedTaskArray = Object.values(storedTasksObject);
  let storedTask = [];
  storedTaskArray.forEach((task) => {
    storedTask.push(JSON.parse(task));
  });
  return storedTask || [];
}

export function showToDoContainer(boolean) {
  boolean
    ? appNodes.main.classList.remove("hidden")
    : appNodes.main.classList.add("hidden");

  boolean
    ? appNodes.footer.classList.remove("hidden")
    : appNodes.footer.classList.add("hidden");
}

export function newTaskCard(task) {
  const newLi = createElement("li");
  newLi.id = `li${task.id}`;
  const newDiv = createElement("div");
  newDiv.classList.add("view");
  const newCheckboxImput = createElement("input");
  newCheckboxImput.type = "checkbox";
  newCheckboxImput.classList.add("toggle");
  newCheckboxImput.id = `checkbox${task.id}`;
  const newLabel = createElement("label");
  newLabel.innerHTML = task.title;
  newLabel.id = `label${task.id}`;
  const newRevomeBtn = createElement("button");
  newRevomeBtn.classList.add("destroy");
  newRevomeBtn.id = `remove${task.id}`;
  const newInput = createElement("input");
  newInput.classList.add("edit");
  newInput.value = task.title;
  newInput.id = `edit${task.id}`;
  if (task.completed) {
    newLi.classList.add("completed");
    newCheckboxImput.checked = "checked";
  } //if isEditing newLi.classList.add("editing");

  appNodes.toDoList.appendChild(newLi);
  newLi.appendChild(newDiv);
  newLi.appendChild(newInput);
  newDiv.appendChild(newCheckboxImput);
  newDiv.appendChild(newLabel);
  newDiv.appendChild(newRevomeBtn);

  //Event listeners
  newRevomeBtn.addEventListener("click", () => {
    let taskId = newRevomeBtn.id.slice(6);
    window.localStorage.removeItem(taskId);
    appNodes.toDoList.innerHTML = "";
    let newTaskList = getStoredTasks();
    newTaskList.length ? renderTaskList(newTaskList) : showToDoContainer(false);
  });

  newCheckboxImput.addEventListener("click", (e) => {
    let taskId = newCheckboxImput.id.slice(8);
    newLi.classList.toggle("completed");
    completedTaskToggle(taskId);
  });

  newLabel.addEventListener("dblclick", (e) => {
    console.log(e);
  });
}
