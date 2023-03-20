console.log("Hello from todos.js");
let list = document.querySelector(".todos-list");
let todoForm = document.querySelector(".todo-form");
let inputTodo = document.querySelector("#todo");
let inputCompleted = document.querySelector("#completed");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = inputTodo.value;
  let completed = inputCompleted.value;
  console.log("Todo ", inputTodo.value);
  console.log("Completed ", inputCompleted.value);

  postTodo(todo, completed);
});

// let todos = [
//   { todo_id: 4, todo: "buy a boat", completed: 0 },
//   { todo_id: 5, todo: "Drive a car", completed: 1 },
// ];

fetchTodos();

// GET request -> Todos
async function fetchTodos() {
  const response = await fetch("http://localhost:5050/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
  renderTodos(data);
}

// PATCH request -> Todos
async function patchTodo(todo_id, completed) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "PATCH",
    body: JSON.stringify({ todo_id, completed }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
  fetchTodos();
}

// POST request -> Todos
async function postTodo(todo, completed) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "POST",
    body: JSON.stringify({ todo, completed }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Add Todo data -> ", data);
  fetchTodos();
}

// DELET request -> Todos
async function deleteTodo(todo_id) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "DELETE",
    body: JSON.stringify({ todo_id }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // const data = await response.json();
  // console.log(data);
  fetchTodos();
}

// Function for rendering Todos on Page
function renderTodos(todos) {
  // Clears List
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  // Check not logged in
  if (todos.message == "No Active LoginToken") {
    let h2 = document.createElement("h2");
    let btnHome = document.createElement("button");
    h2.textContent = "Not Logged In!";
    btnHome.textContent = "Take Me Home!";
    btnHome.addEventListener("click", () => (window.location = "/client/html"));
    list.append(h2, btnHome);
    return;
  }

  // Render Each Todo
  todos.forEach((item) => {
    let li = document.createElement("li");
    let btnComplete = document.createElement("button");
    let btnDelete = document.createElement("button");
    btnComplete.textContent = "Change";
    btnDelete.textContent = "Remove";
    let text;
    console.log("Item ->", item);

    if (item.completed === 0) {
      text = `${item.todo} Not Completed`;
      li.innerText = text;
    } else {
      text = `${item.todo} Completed`;
      li.innerText = text;
    }

    btnComplete.addEventListener("click", () => {
      if (item.completed === 0) {
        console.log("was 0 now 1");
        // Fetch här
        patchTodo(item.todo_id, 1);
      } else {
        console.log("Was 1 now 0");
        patchTodo(item.todo_id, 0);
      }
    });

    btnDelete.addEventListener("click", () => {
      deleteTodo(item.todo_id);
    });

    li.append(btnComplete, btnDelete);
    list.appendChild(li);
    console.log(text);
  });
}
