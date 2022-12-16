'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#todo')
  const addButton = document.querySelector('#add-button')
  const todoList = document.querySelector('#todo-list')

  addButton.addEventListener('click', addTodo)

    function addTodo() {
    console.log(input)
    if (input.value === '') return alert('입력하세요')
      const item = document.createElement('div')

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'

      const text = document.createElement('span');

      const deleteButton = document.createElement('button')
      deleteButton.textContent = "제거하기"

      text.textContent = input.value
      input.value = ''

      item.appendChild(checkbox)
      item.appendChild(text)
      item.appendChild(deleteButton)
      todoList.appendChild(item)


      checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          text.style.textDecoration = 'line-through'
        }
        else {
          text.style.textDecoration = 'none'
        }
      })


      deleteButton.addEventListener('click', (event) => {
        todoList.removeChild(event.currentTarget.parentNode)
      })
      input.value = ''
      // alert.textContent = ''
    
  }



  input.addEventListener('keypress', (event) => {
    const ENTER = 13
    if (event.keyCode === ENTER)
      addTodo();
  })
})