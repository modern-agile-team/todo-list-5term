"use strict";

const text = document.querySelector("#text");
const addBtn = document.querySelector("#button");
const ul = document.getElementById('fruits');
//checkbox.setAttribute('onClick', 'isCheck(this)')

addBtn.addEventListener("click", addlist);

load();

function load() {
  fetch("/").then((res) => res.json())
    .then((res) => {
      res.forEach(list => {
        const basic = basicFunction()
        const li = document.createElement('li');
        li.setAttribute('id', list.id);
        li.append(basic.checkbox, list.description, basic.pencilImg, basic.eraserImg);
        ul.appendChild(li);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  // document.querySelectorAll('.pencilImg').forEach(ele => ele.addEventListener('click', correction));
  // document.querySelectorAll('.eraserImg').forEach(ele => ele.addEventListener('click', Delete));
};

function addlist() {
  if (text.value === '') return alert("아무것도 입력되지 않았습니다.")

  const req = {
    text: text.value,
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
        const basic = basicFunction();
        const li = document.createElement('li'); // li 동적 생성
        const ulCount = ul.hasChildNodes() ? Number(ul.lastChild.id) + 1 : 0; //  ul 마지막 자식태그 id 구하기
        li.setAttribute('id', ulCount);
        li.append(basic.checkbox, req.text, basic.pencilImg, basic.eraserImg);
        ul.appendChild(li);
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });

}

function basicFunction() {
  const pencilImg = document.createElement('img');
  const eraserImg = document.createElement('img');
  const checkbox = document.createElement('input');
  pencilImg.setAttribute('onClick', 'conversion(this)');
  eraserImg.setAttribute('onClick', 'Delete(this)');
  pencilImg.setAttribute('src', '/image/pencil.png')
  eraserImg.setAttribute('src', '/image/eraser.png');
  checkbox.setAttribute('type', 'checkbox');

  return { checkbox, pencilImg, eraserImg };
  //.addEventListener(오류 발생) https://stackoverflow.com/questions/64539129/cannot-use-addeventlistener-on-a-createelement-a-button-after-displaying-i
  // pencilImg.setAttribute('class', 'pencilImg');
  // eraserImg.setAttribute('class', 'eraserImg');
}

function Delete(list) {
  const li = list.parentNode;
  const req = {
    li: li.id,
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
        document.getElementById(li.id).remove();
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function conversion(list){
  const li = list.parentNode;
  let test = li.childNodes;

  console.log(test)

    //.setAttribute('type', 'checkbox');
  // const req = {
  //   listId: li.id,
  // };
}

function correction(list) {
  // fetch("/", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(req),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (res.success) {
  //     } else {
  //       alert(res.msg);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}
