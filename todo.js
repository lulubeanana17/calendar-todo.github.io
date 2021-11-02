const todoContainer = document.querySelector("#todoContainer");
const todo = document.querySelector("#todo");
const todoTitle = document.querySelector("#todo h2");
const todoInput = document.querySelector("#todo input");
const todoBtn = document.querySelector("#todoContainer button");
const todoList = document.querySelector("#todoList");
const dateCell = document.getElementsByClassName("dateCell");

let todoKey = "";
let storage = [];

function openTodoList(event) {
  event.preventDefault();
  todoContainer.classList.remove("hidden");
  const selectedDay =
    dayAll[
      new Date(currentYear, currentMonth, event.target.innerText).getDay()
    ];
  todoTitle.innerText =
    currentYear +
    " / " +
    monthAll[currentMonth] +
    " / " +
    event.target.innerText +
    " / " +
    selectedDay;
  
  todoKey = currentYear.toString() + currentMonth.toString() + event.target.innerText;
  
  const todoValue = JSON.parse(localStorage.getItem(todoKey));

  if(todoValue !== null) {
    todoValue.forEach(element => {showTodo(element)});
    storage = todoValue;
  }


  todo.addEventListener("submit", getTodo);
  todoBtn.addEventListener("click", closeTodoList);
}

function closeTodoList(event) {
  event.preventDefault();
  todoContainer.classList.add("hidden");
  saveTodo();
  storage = [];
  todoList.innerHTML = "";
}

function getTodo(event) {
  event.preventDefault();
  if(storage.length < 7) {
    const newObj = {
      id: new Date().getTime(),
      text: todoInput.value
    }
    todoInput.value = "";
    storage.push(newObj);
    showTodo(newObj);
  } else {
    alert("List is Full");
  }
}

function saveTodo() {
  localStorage.removeItem(todoKey);
  localStorage.setItem(todoKey, JSON.stringify(storage));
}

function showTodo(newObj) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const span = document.createElement("span");
  li.id = newObj.id;
  button.innerText = "✖";
  span.innerText = newObj.text;
  li.appendChild(button);
  li.appendChild(span);
  todoList.appendChild(li);

  button.addEventListener("click", deleteTodo);
}

function deleteTodo(event) {
  event.preventDefault();
  for(let i = 0; i < storage.length; i++) {
    if(storage[i].id == parseInt(event.target.parentElement.id)) {
      storage.splice(i, 1);
    }
  }
  todoList.innerHTML = "";
  storage.forEach(element => {showTodo(element)});
}