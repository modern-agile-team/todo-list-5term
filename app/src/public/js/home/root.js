"use strict";
const list = document.querySelector("#list");
const createBtn = document.querySelector("#createBtn");

createBtn.addEventListener("click", toCreate);

function toCreate() {
  const req = {
    description: list.value,
  };

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function toEdit(id) {
  let text = document.getElementById("edit" + id);

  const req = {
    id: id,
    description: text.value,
  };

  fetch("/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function toCheck(id, isCheck) {
  const req = {
    id: id,
    is_check: isCheck,
  };

  fetch("/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function toDelete(id) {
  const req = {
    id: id,
  };
  fetch("/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function getId(type, index) {
  let btn = document.getElementById(type + index);
  let idValue = btn.parentNode.id;
  return idValue;
}

function change(type, index, description) {
  let id = getId(type, index);
  let toCange = document.getElementById(type + index).parentNode;
  toCange.innerHTML = `<input type="checkbox" class="checkbox2"><input id="${
    "edit" + id
  }" class="editInput"
  type="text"
  onkeyup="if(window.event.keyCode===13){toEdit(${id})}"/>`;
  let newEditBtn = document.createElement("button");
  let newdeleteBtn = document.createElement("button");
  newEditBtn.innerHTML = "완료";
  newEditBtn.setAttribute("id", "editBtn" + index);
  newEditBtn.setAttribute("class", "doneBtn");
  newdeleteBtn.setAttribute("class", "deleteBtn");
  newEditBtn.setAttribute("onClick", `toEdit(${id})`);
  newdeleteBtn.setAttribute("onClick", `toDelete(${id})`);
  let text = document.getElementById(id);
  text.appendChild(newEditBtn);
  text.appendChild(newdeleteBtn);
  let input = document.getElementById("edit" + id);
  input.focus();
  input.value = description;
}
