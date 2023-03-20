console.log("Hello from Friends.js");

let friendForm = document.querySelector(".friend-form");
let inputUsername = document.querySelector("#username");
let formRegisterBtn = document.querySelector(".friend-form-btn");
let responseOutput = document.querySelector(".h3-response");

formRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let username = inputUsername.value;
  // responseOutput.textContent = `Added ${username}`;
  addFriend(username);
});

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
}
