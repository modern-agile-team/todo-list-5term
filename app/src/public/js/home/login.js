"use strict";

// 로그인 창에서 입력한 값을 가져온다
const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("button");

// 로그인 버튼을 누르면 아래 로그인 함수를 실행하라
loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then(res => res.json())
    .then(res => {
      if (res.sucess == true) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    });
}
