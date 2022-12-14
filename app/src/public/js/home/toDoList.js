"use strict";

const text = document.querySelector("#text");
const addBtn = document.querySelector("#button");
const ul = document.getElementById('fruits');
addBtn.addEventListener("click", addlist);

load();

function load() {
  fetch("/").then((res) => res.json())
    .then((res) => {
      res.forEach(list => {
        const li = document.createElement('li');
        li.setAttribute('id', list.id);
        const basic = basicFunction(list.id)
        li.append(basic.checkbox, basic.updateText, basic.text, basic.hiddenBtn, basic.pencilImg, basic.eraserImg);
        ul.appendChild(li);
        document.getElementById(list.id + "text").innerHTML = list.description;
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
        const li = document.createElement('li'); // li 동적 생성
        const ulCount = ul.hasChildNodes() ? Number(ul.lastChild.id) + 1 : 0; //  ul 마지막 자식태그 id 구하기
        li.setAttribute('id', ulCount);
        const basic = basicFunction(ulCount);
        li.append(basic.checkbox, basic.updateText, basic.text, basic.hiddenBtn, basic.pencilImg, basic.eraserImg);
        ul.appendChild(li);
        document.getElementById(ulCount + "text").innerHTML = req.text;
        text.value = '';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
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

function correction(id,text) {
  const req = {
    id,
    text,
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
        document.getElementById(req.id + "text").innerHTML = req.text;
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function basicFunction(id) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('onClick', 'isCheck(this)');

  const hiddenBtn = document.createElement('input');
  hiddenBtn.setAttribute('type', 'button');
  hiddenBtn.setAttribute('value', '완료');
  hiddenBtn.setAttribute('onClick', 'conversion(this)');
  hiddenBtn.style.display = 'none';

  const text = document.createElement('span');
  text.setAttribute('id', id + 'text');

  const updateText = document.createElement('input');
  updateText.setAttribute('type', 'text');
  updateText.style.display = 'none';

  const pencilImg = document.createElement('img');
  pencilImg.setAttribute('onClick', 'conversion(this)');
  pencilImg.setAttribute('src', '/image/pencil.png')

  const eraserImg = document.createElement('img');
  eraserImg.setAttribute('onClick', 'Delete(this)');
  eraserImg.setAttribute('src', '/image/eraser.png');

  return { checkbox, text, pencilImg, eraserImg, hiddenBtn, updateText };
  //.addEventListener(오류 발생) https://stackoverflow.com/questions/64539129/cannot-use-addeventlistener-on-a-createelement-a-button-after-displaying-i
}

function conversion(img) {
  const li = img.parentNode;
  const updateText = document.getElementById(li.id).firstChild.nextSibling;
  const text = updateText.nextSibling;
  const hiddenBtn = text.nextSibling;
  const pencilImg = hiddenBtn.nextSibling;
  let updateOn = updateText.style.display === 'none' ? true : false;
  
  if (updateOn) {
    updateText.value = text.innerText;
    updateText.style.display = '';
    text.style.display = 'none';
    hiddenBtn.style.display = '';
    pencilImg.style.display = 'none';
  }
  else{
    updateText.style.display = 'none';
    text.style.display = '';
    hiddenBtn.style.display = 'none';
    pencilImg.style.display = '';

    if(updateText.value === '') return alert("아무것도 입력되지 않았습니다.");
    correction(li.id, updateText.value);
  }
  //this.parentNode.firstChild.nodeName 기본적으로 함수가 아닌 속성이므로 아무 효과가 없다.  
}

function isCheck(box) {
  //closest()등 부모요소 자식요소 가져와서 textNode 변경 확인
  const text = box.nextSibling.nextSibling;
  const pensilImg = box.nextSibling.nextSibling.nextSibling.nextSibling;
  
  if (box.checked === true) {
    text.setAttribute('style', 'color:#797979; text-decoration:line-through;');
    pensilImg.style.display = 'none';
  }
  else {
    text.setAttribute('style', 'color:none');
    pensilImg.style.display = '';
  }
}
