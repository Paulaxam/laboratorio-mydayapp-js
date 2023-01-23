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
  if (task.completed) {
    newLi.classList.add("completed");
  } //if isEditing newLi.classList.add("editing");
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
    renderTaskList(newTaskList);
  });

  newCheckboxImput.addEventListener("click", (e) => {
    console.log(e);
  });
}
