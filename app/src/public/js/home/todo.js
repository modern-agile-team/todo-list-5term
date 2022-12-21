"use strict";

let createList = document.getElementById("createList");
let newListBtn = document.getElementById("newListBtn");

let newList = document.createElement("input");
newList.setAttribute("type", "text");
newList.setAttribute("id", "work");
newList.setAttribute("placeholder", "내용 입력");
newList.addEventListener("keypress", key => {
  if (key.code === "Enter") inserting();
});

let createBtn = document.createElement("button");
createBtn.innerHTML = "추가";
let cancelBtn = document.createElement("button");
cancelBtn.innerHTML = "취소";

newListBtn.addEventListener("click", create);

function create() {
  createList.removeChild(newListBtn);
  createList.append(newList);
  createList.append(createBtn);
  createList.append(cancelBtn);

  createBtn.addEventListener("click", inserting);
  cancelBtn.addEventListener("click", cancel);
  function cancel() {
    createBtn.remove();
    cancelBtn.remove();
    newList.remove();
    createList.append(newListBtn);
  }
}

function inserting() {
  const req = {
    content: document.getElementById("work").value,
  };
  if (req.content == "") {
    alert("할 일을 입력 해 주십시오");
  } else {
    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) alert(data.msg);
      });
  }
  location.reload(true);
}
//input 안의 내용을 데이터 베이스로 보내기(insert)

function loading() {
  fetch("/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then(res => {
    res.json();
  });

  // 페이지 렌딩 후 데이터 베이스의 모든 할 일 들을 불러와 수정,삭제 버튼과 함께 게시(select)
}

// 데이터 주고받는 경로
// todo.ejs input입력받기
// todo.js fetch입력 후 전달
// index.js 라우팅(넘겨주기 + http 메서드 명시 + 렌더 아닌 작업은 process명시)
// home.ctrl.js 변수로 정립 후 양방향 전달
// crud.js 원하는 작업 수행
// crudStorage.js 데이터 베이스에 직접 연결

//rest api
