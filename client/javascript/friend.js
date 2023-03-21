console.log("Hello from Friends.js");

let friendForm = document.querySelector(".friend-form");
let inputUsername = document.querySelector("#username");
let formRegisterBtn = document.querySelector(".friend-form-btn");
let responseOutput = document.querySelector(".h3-response");
let list = document.querySelector(".todos-list");

formRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let username = inputUsername.value;
  addFriend(username);
});
fetchTodos();

// POST addFriend
async function addFriend(username) {
  const response = await fetch("http://localhost:5050/friends", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  responseOutput.textContent = data.message;
  console.log("Add Todo data -> ", data);
  await fetchTodos();
}

// GET getTodos
async function fetchTodos() {
  const response = await fetch("http://localhost:5050/friends", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  renderTodos(data);
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
    let text;

    // Changes completed from 0/1 to string
    if (item.completed === 0) {
      text = `User: ${item.username} - Todo:${item.todo} - Status: Not Completed`;
      li.innerText = text;
    } else {
      text = `User: ${item.username} - Todo:${item.todo} - Status: Completed`;
      li.innerText = text;
    }

    list.appendChild(li);
  });
}
