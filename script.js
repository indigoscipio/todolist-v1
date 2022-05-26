//variables
let todoInput = document.querySelector("#todo-input");
let btnAddTodo = document.querySelector(".add-new-list");
let projectsList = document.querySelector(".projects-list");
let newProjectForm = document.querySelector("form[data-new-project-form]");
let newProjectInput = document.querySelector("input[data-new-project-input]");
let btnDeleteProject = document.querySelector(
  "button[data-delete-project-button]"
);
let listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
let listTitleElement = document.querySelector("[data-list-title]");
let listCountElement = document.querySelector("[data-list-count]");
let tasksContainer = document.querySelector("[data-todo-list]");
let taskTemplate = document.getElementById("task-template");
//event listeners

//default states
const LOCAL_STORAGE_PROJECT_KEY = "task.projects";
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = "task.selectedProjectId";
let todoItems = [];
let projects =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_KEY
);

btnDeleteProject.addEventListener("click", (e) => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
});

projectsList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProjectId = e.target.dataset.projectId;
    saveAndRender();
  }
});

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let projectName = newProjectInput.value;
  if (!projectName.trim()) return;
  let project = createProject(projectName);
  console.log(project);
  newProjectInput.value = null;
  projects.push(project);
  saveAndRender();
});

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, selectedProjectId);
}

function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [{ id: "gsdgasgd", name: "test", complete: false }],
  };
}

function render() {
  clearElement(projectsList);
  renderProject();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  if (selectedProjectId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedProject.name;

    renderTaskCount(selectedProject);
    clearElement(tasksContainer);
    renderTasks(selectedProject);
  }
}
render();

function renderTasks(selectedProject) {
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkBox = taskElement.querySelector("input");
    checkBox.id = task.id;
    checkBox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedProject) {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (project) => !project.complete.length
  );
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderProject() {
  projects.forEach((list) => {
    let projectItem = document.createElement("li");
    projectItem.dataset.projectId = list.id;
    projectItem.classList.add("project-item");
    projectItem.innerText = list.name;
    if (list.id === selectedProjectId) projectItem.classList.add("active");
    projectsList.appendChild(projectItem);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function validateInput() {
//   let text = todoInput.value.trim();
//   if (!text) {
//     alert("Don't leave the input empty!");
//   } else {
//     addNewTodo(text);
//   }
// }

// function addNewTodo(text) {
//   const todo = {
//     text,
//     checked: false,
//     id: Date.now(),
//     isDeleted: false,
//     isEdited: false,
//   };
//   todoItems.push(todo);
//   renderTodo(todo);
//   console.log(todoItems);
// }

// //Render todo list
// function renderTodo(todo) {
//   let todoList = document.querySelector(".project-todo");
//   const isChecked = todo.checked ? "checked" : "";
//   let node = document.createElement("li");
//   node.classList.add("todo-item");
//   node.setAttribute("data-key", todo.id);
//   node.innerHTML = `
//   <i class="icon-checkbox fa-solid fa-check ${isChecked}"></i>
//   <span class="todo-item-text">${todo.text}</span>
//   <input type="date" class="todo-input-date" />
//   <i class="icon-delete fa-solid fa-trash-can"></i>
//   <i class="icon-edit fa-solid fa-pen-to-square"></i>`;
//   todoList.append(node);
// }

// //Mark task as completed
// let todoList = document.querySelector(".project-todo");
// todoList.addEventListener("click", (e) => {
//   if (e.target.classList.contains("checked")) {
//     let itemKey = e.target.parentElement.dataset.key;
//     toggleDone(itemKey);
//   }
// });

// function toggleDone(key) {
//   const index = todoItems.findIndex((item) => item.id === Number(key));
//   todoItems[index].checked = !todoItems[index].checked;
//   renderTodo(todoItems[index]);
// }

// let todoItem = document.createElement("li");
// todoItem.classList.add("todo-item");
// todoItem.innerHTML = `<i class="icon-checkbox fa-solid fa-check"></i>
// <span class="todo-item-text">${todoInput.value}</span>
// <input type="date" class="todo-input-date" />
// <i class="icon-delete fa-solid fa-trash-can"></i>
// <i class="icon-edit fa-solid fa-pen-to-square"></i>`;

// function Todo(checked, description, date, isDeleted, isEdited) {
//   this.checked = checked;
//   this.description = description;
//   this.date = date;
//   this.isDeleted = isDeleted;
//   this.isEdited = isEdited;
// }

// function addNewTodo(Todo) {
//   console.log(Todo);
// }
