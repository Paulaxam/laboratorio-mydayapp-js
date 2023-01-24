import { appNodes } from "./nodes";

export function* idGen() {
  let id = Math.round(Math.random() * 1000);
  while (true) {
    yield id.toString();
    id++;
  }
}

export const idGenerator = idGen();

export function showClearCompletedBtn(boolean) {
  boolean
    ? appNodes.clearBtn.classList.remove("hidden")
    : appNodes.clearBtn.classList.add("hidden");
}

export function taskCounter() {
  let taskList = getStoredTasks();
  let counter = 0;
  taskList.forEach((task) => {
    if (!task.completed) {
      counter++;
    }
  });
  if (counter === 1) {
    appNodes.itemCounter.innerHTML = "item";
  } else {
    appNodes.itemCounter.innerHTML = "items";
  }
  appNodes.counter.innerHTML = counter;
}

export function renderTaskList(taskList) {
  let i = 0;
  taskList.forEach((element) => {
    newTaskCard(element);
    if (element.completed === true) {
      i++;
    }
  });
  showClearCompletedBtn(i);
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
    window.localStorage.setItem(id, JSON.stringify(task));
  } else {
    task.completed = false;
    window.localStorage.setItem(id, JSON.stringify(task));
  }
  let taskList = getStoredTasks();
  let i = 0;
  taskList.forEach((element) => {
    if (element.completed === true) {
      i++;
    }
  });
  showClearCompletedBtn(i);
}

export function getStoredTasks() {
  let storedTasksObject = { ...window.localStorage };
  let storedTaskArray = Object.values(storedTasksObject);
  storedTaskArray.pop();
  let storedTask = [];
  storedTaskArray.forEach((task) => {
    storedTask.push(JSON.parse(task));
  });
  return storedTask || [];
}

export function saveLikeMyApp() {
  let storedTasks = getStoredTasks();
  window.localStorage.setItem("mydayapp-js", JSON.stringify(storedTasks));
}

export function showToDoContainer(boolean) {
  boolean
    ? appNodes.main.classList.remove("hidden")
    : appNodes.main.classList.add("hidden");

  boolean
    ? appNodes.footer.classList.remove("hidden")
    : appNodes.footer.classList.add("hidden");

  if (!boolean) {
    showClearCompletedBtn(false);
  }
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
    taskCounter();
    saveLikeMyApp();
  });

  newCheckboxImput.addEventListener("click", () => {
    let taskId = newCheckboxImput.id.slice(8);
    newLi.classList.toggle("completed");
    completedTaskToggle(taskId);
    taskCounter();
    saveLikeMyApp();
  });

  newLabel.addEventListener("dblclick", () => {
    let taskId = newLabel.id.slice(5);
    newLi.classList.add("editing");
    newInput.addEventListener("keydown", (e) => {
      let keydown = e.keyCode;
      let text = newInput.value.trim();
      let labelTxt = newLabel.innerHTML;
      let task = JSON.parse(window.localStorage.getItem(taskId));
      console.log(labelTxt);
      if (keydown === 13) {
        if (text === labelTxt || text === "") {
          newLi.classList.remove("editing");
        } else {
          task.title = text;
          newInput.value = text;
          labelTxt = text;
          newLabel.innerHTML = labelTxt;
          window.localStorage.setItem(taskId, JSON.stringify(task));
          newLi.classList.remove("editing");
          saveLikeMyApp();
        }
      }
      if (keydown === 27) {
        newLi.classList.remove("editing");
      }
    });
  });
}
