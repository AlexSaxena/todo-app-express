console.log("Hello from todos.js");
let list = document.querySelector(".todos-list");

// let todos = [
//   { todo_id: 4, todo: "buy a boat", completed: 0 },
//   { todo_id: 5, todo: "Drive a car", completed: 1 },
// ];

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
  addTodos(data);
}
fetchTodos();

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

// Function for rendering Todos on Page
function addTodos(todos) {
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  todos.forEach((item) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.textContent = "Change";
    let text;
    console.log("Item ->", item);

    if (item.completed === 0) {
      text = `${item.todo} Not Completed`;
      li.innerText = text;
    } else {
      text = `${item.todo} Completed`;
      li.innerText = text;
    }

    btn.addEventListener("click", () => {
      if (item.completed === 0) {
        console.log("was 0 now 1");
        // Fetch här
        patchTodo(item.todo_id, 1);
      } else {
        console.log("Was 1 now 0");
        patchTodo(item.todo_id, 0);
      }
    });

    li.appendChild(btn);
    list.appendChild(li);
    console.log(text);
  });
}
