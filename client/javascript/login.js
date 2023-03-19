console.log("Script Login");

let loginForm = document.querySelector(".login-form");
let inputUsername = document.querySelector("#username");
let inputPassword = document.querySelector("#password");
let formLoginBtn = document.querySelector(".loginFormBtn");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = inputUsername.value;
  let password = inputPassword.value;

  const response = await fetch("http://localhost:5050/login", {
    method: "POST",
    body: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Data ->", data);
  console.log("response ->", response);

  h2.textContent = response.message;
});
