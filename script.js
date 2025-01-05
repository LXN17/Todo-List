let todoList = [];

// Функция для загрузки данных из localStorage при загрузке страницы
function loadTodoList() {
  const storedList = localStorage.getItem("todoList");
  if (storedList) {
    todoList = JSON.parse(storedList);
  }
  renderTodoList();
}

// Функция для сохранения текущего состояния списка задач в localStorage
function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Функция для отображения списка задач на странице
function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const { name, date } = todoList[i];
    const html = `
      <p>${name}</p>
      <p>${date}</p>
      <button onclick="deleteTodo(${i})">delete</button>
    `;
    todoListHTML += html;
  }

  document.querySelector(".todoList").innerHTML = todoListHTML;
}

// Функция для добавления новой задачи
function addTodo() {
  const inputElement = document.querySelector(".todoInput");
  const name = inputElement.value.trim();
  const dateElement = document.querySelector(".todoInputDate");
  const date = dateElement.value;

  if (name && date) {
    todoList.push({ name, date });
    inputElement.value = "";
    dateElement.value = "";
    saveTodoList();
    renderTodoList();
  } else {
    alert("Please enter both a todo name and date.");
  }
}

// Функция для удаления задачи по индексу
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  renderTodoList();
}

// Загрузка списка задач при загрузке страницы
window.onload = loadTodoList;