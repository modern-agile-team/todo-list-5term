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
      console.log(res);
      if (res.success) {
        // alert("생성성공");
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("에러 발생"));
    });
}

function toEdit(id) {
  console.log(document.getElementById("edit" + id));
  let text = document.getElementById("edit" + id);
  console.log("수정확인", text.value);
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
      console.log(res);
      if (res.success) {
        // alert("수정성공");
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("에러 발생"));
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
      console.log(res);
      if (res.success) {
        // alert("수정성공");
        location.href = "/";
        console.log("체크");
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.log(err);
      console.error(new Error("에러 발생"));
    });
}

function toDelete(id) {
  const req = {
    id: id,
  };
  // console.log(data);
  fetch("/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        // alert("삭제성공");
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("에러 발생"));
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
  toCange.innerHTML = `<input id="${"edit" + id}" 
  type="text" value="${description}" 
  onkeyup="if(window.event.keyCode===13){toEdit(${id})}"/>`;
  let newEditBtn = document.createElement("button");
  newEditBtn.innerHTML = "완료";
  newEditBtn.setAttribute("id", "editBtn" + index);
  newEditBtn.setAttribute("onClick", `toEdit(${id})`);
  let text = document.getElementById(id);
  text.appendChild(newEditBtn);
}
