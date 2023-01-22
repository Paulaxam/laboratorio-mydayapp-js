import { appNodes } from "./nodes";

export function* idGen() {
  let id = 1;
  while (true) {
    yield id.toString();
    id++;
  }
}

export const idGenerator = idGen();

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
  if (task.completed) {
    newLi.classList.add("completed");
  } //if isEditing newLi.classList.add("editing");
  const newDiv = createElement("div");
  newDiv.classList.add("view");
  const newCheckboxImput = createElement("input");
  newCheckboxImput.type = "checkbox";
  newCheckboxImput.classList.add("toggle");
  const newLabel = createElement("label");
  newLabel.innerHTML = task.title;
  const newRevomeBtn = createElement("button");
  newRevomeBtn.classList.add("destroy");
  const newInput = createElement("input");
  newInput.classList.add("edit");
  newInput.value = task.title;

  appNodes.toDoList.appendChild(newLi);
  newLi.appendChild(newDiv);
  newLi.appendChild(newInput);
  newDiv.appendChild(newCheckboxImput);
  newDiv.appendChild(newLabel);
  newDiv.appendChild(newRevomeBtn);
}
