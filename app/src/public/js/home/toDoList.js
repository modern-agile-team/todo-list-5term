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
        const basic = basicFunction(list.id, li, list.is_check);
        li.append(basic.checkbox, basic.label, basic.updateText, basic.text, basic.hiddenBtn, basic.eraserImg, basic.pencilImg);
        ul.appendChild(li);
        document.getElementById(list.id + "text").innerHTML = list.description;
        if(list.is_check) isCheckUpdate(basic.checkbox);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

function addlist() {
  if (text.value === '') return alert("아무것도 입력되지 않았습니다.");
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
        const li = document.createElement('li');
        const ulCount = res['LAST_INSERT_ID()'];
        li.setAttribute('id', ulCount);
        const basic = basicFunction(ulCount, li);
        li.append(basic.checkbox, basic.label, basic.updateText, basic.text, basic.hiddenBtn, basic.eraserImg, basic.pencilImg);
        ul.appendChild(li);
        document.getElementById(ulCount + "text").innerHTML = req.text;
        text.value = '';
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

function isCheckUpdate(box) {
  const li = box.parentNode;

  const req = {
    box: box.checked,
    id: li.id,
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
        isCheck(box);
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function basicFunction(id,li,check) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('onClick', 'isCheckUpdate(this)');
  checkbox.setAttribute('id', id+'checkBox');
  if(check)checkbox.setAttribute('checked','');

  const label = document.createElement('label');
  label.setAttribute('for', id+'checkBox');

  const hiddenBtn = document.createElement('input');
  hiddenBtn.setAttribute('type', 'button');
  hiddenBtn.setAttribute('value', '완료');
  hiddenBtn.setAttribute('onClick', 'conversion(this)');
  hiddenBtn.setAttribute('class','hiddenBtn');
  hiddenBtn.style.display = 'none';

  const text = document.createElement('span');
  text.setAttribute('class', 'text');
  text.setAttribute('id', id + 'text');
  
  const updateText = document.createElement('input');
  updateText.setAttribute('type', 'text');
  updateText.setAttribute('class','updateText');
  updateText.style.display = 'none';

  const pencilImg = document.createElement('span');
  pencilImg.setAttribute('onClick', 'conversion(this)');
  pencilImg.setAttribute('class', 'pencil');
  
  const eraserImg = document.createElement('span');
  eraserImg.setAttribute('onClick', 'Delete(this)');
  eraserImg.setAttribute('class', 'eraser');

  li.setAttribute('style', 'border-bottom: 1px solid #CBCBCB; height: 34px; width: 359.23px; margin-bottom: 9px;');
  return { label, checkbox, text, pencilImg, eraserImg, hiddenBtn, updateText };
  //.addEventListener(오류 발생) https://stackoverflow.com/questions/64539129/cannot-use-addeventlistener-on-a-createelement-a-button-after-displaying-i
}

function conversion(img) {
  const li = img.parentNode;
  const updateText = document.getElementById(li.id).firstChild.nextSibling.nextSibling;
  const text = updateText.nextSibling;
  const hiddenBtn = text.nextSibling;
  const eraserImg = hiddenBtn.nextSibling;
  const pencilImg = eraserImg.nextSibling;
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

function isCheck(box){
  const text = box.nextSibling.nextSibling.nextSibling;
  const pensilImg = box.parentNode.lastChild;
  
  if (box.checked === true) {
    text.setAttribute('class', 'checkText');
    if(text.style.display === 'none'){
      text.style.display = 'none';
    }
    else{
      pensilImg.style.display = 'none';  
    }
  }
  else {
    text.setAttribute('class', 'text');
    if(text.style.display === 'none'){
      text.style.display = 'none';
    }
    else{
    pensilImg.style.display = '';
    }
  }
}
