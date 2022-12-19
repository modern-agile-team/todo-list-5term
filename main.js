"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#todo");
  const addButton = document.querySelector("#add-button");
  const todoList = document.querySelector("#todo-list");

  addButton.addEventListener("click", addTodo);

  let itemID = 0;

  function addTodo() {
    itemID++;

    console.log(input);
    if (input.value === "") return alert("입력하세요");
    const item = document.createElement("div");
    item.setAttribute("id", itemID);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const updateText = document.createElement("input");
    updateText.setAttribute("class", "가리기");
    updateText.type = "text";
    updateText.value = input.value

    const updateFin = document.createElement("button")
    updateFin.textContent = "완료"
    updateFin.setAttribute("class","가리기");
    updateText.type = "";
    updateText.value = input.value


    const text = document.createElement("span");

    const editButton = document.createElement("button");
    editButton.textContent = "수정하기";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "제거하기";

    text.textContent = input.value;
    input.value = "";

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(updateText);
    item.appendChild(editButton);
    item.appendChild(updateFin);
    item.appendChild(deleteButton);
    todoList.appendChild(item);

    checkbox.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        text.style.textDecoration = "line-through";
      } else {
        text.style.textDecoration = "none";
      }
    });

    editButton.addEventListener("click", (event) => {
      updateText.setAttribute("class", "");
      text.setAttribute("class", "가리기");
      updateFin.setAttribute("class", "");
      editButton.setAttribute("class", "가리기")
    });

    updateFin.addEventListener("click", (event) => {
      updateText.setAttribute("class", "가리기");
      text.setAttribute("class", "");
      updateFin.setAttribute("class", "가리기");
      editButton.setAttribute("class", "")
      console.log(updateText.value)
      text.textContent = updateText.value
    });


    deleteButton.addEventListener("click", (event) => {
      todoList.removeChild(event.currentTarget.parentNode);
    });
    input.value = "";
    // alert.textContent = ''
  }
  function update(edit) {
    console.log(edit);
  }

  input.addEventListener("keypress", (event) => {
    console.log(event)
    const ENTER = 13;
    if (event.keyCode === ENTER) addTodo();
  });
});