"use strict";

const text = document.querySelector("#inputText"),
  addBtn = document.querySelector("#button");

addBtn.addEventListener("click", addToDo);

function addToDo() {
  const req = {
    text: text.value,
  };

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}
