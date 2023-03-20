console.log("Hello from Friends.js");

let friendForm = document.querySelector(".friend-form");
let inputUsername = document.querySelector("#username");
let formRegisterBtn = document.querySelector(".friend-form-btn");
let responseOutput = document.querySelector(".h3-response");

formRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(inputUsername.value);
  responseOutput.textContent = `Added ${inputUsername.value}`;
});
