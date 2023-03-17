"user strick"

// 1. HTML elementlarni tanlab oldik
let elMoonBtn = document.querySelector(".nav-box__btnMoon");
let elSunBtn = document.querySelector(".nav-box__btnSun");
let elHeader = document.querySelector(".header");
let body = document.querySelector("body");
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");
let elBtnWrapper = document.querySelector(".button-wrapper");
let elAllCount = document.querySelector(".all-count");
let elCompletedCount = document.querySelector(".completed-count");
let elUnCompletedCount = document.querySelector(".uncompleted-count");
let elAllBtn = document.querySelector(".btn-all");
let elCompleteBtn = document.querySelector(".btn-completed");
let elUncompleteBtn = document.querySelector(".btn-uncompleted");
let elClearAllBtn = document.querySelector(".btn-clearAll");


// toggle color
elSunBtn.style.display = "none";
elMoonBtn.addEventListener("click", function(){
  elMoonBtn.style.display = "none";
  elSunBtn.style.display = "inline";
  // body.classList.toggle('dark-mode');
  body.classList.add('dark')
})

elSunBtn.addEventListener("click", function(){
  elSunBtn.style.display = "none";
  elMoonBtn.style.display = "inline";
  body.classList.remove('dark')
})


//  New array for todos
const todos = [];

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let btnTodoId = evt.target.dataset.todoId * 1;
    let foundIndex = todos.findIndex((todo) => todo.id === btnTodoId);

    todos.splice(foundIndex, 1);

    elList.innerHTML = null;

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    let checkTodoId = evt.target.dataset.checkId * 1;

    let foundCheckTodo = todos.find((todo) => todo.id === checkTodoId);

    foundCheckTodo.isCompleted = !foundCheckTodo.isCompleted;

    elList.innerHTML = null;

    renderTodos(todos, elList);
  }
});


const renderTodos = function (arr, element) {
  elAllCount.textContent = todos.length;
  elCompletedCount.textContent = todos.filter(
    (todo) => todo.isCompleted
  ).length;
  elUnCompletedCount.textContent = todos.filter(function (todo) {
    return !todo.isCompleted;
  }).length;

  arr.forEach(function (todo) {
    let newCheckbox = document.createElement("input");
    let newLi = document.createElement("li");
    let newDeleteBtn = document.createElement("button");
    let text = document.createElement('h4')

    newCheckbox.type = "checkbox";

    newCheckbox.classList.add("checkbox-btn");
    newLi.classList.add("ul-item");
    newDeleteBtn.classList.add("delete-btn");
    text.classList.add('text-todo')

    text.textContent = todo.title;



    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      text.style.textDecoration = "line-through";
    }       

    newLi.appendChild(newCheckbox);
    element.appendChild(newLi); 
    newLi.appendChild(text)
    newLi.appendChild(newDeleteBtn);
  });
};


elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let inputValue = elInput.value;
  
  if(inputValue == "") return

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };
  todos.push(newTodo);
  elList.innerHTML = null;
  elInput.value = null;
  renderTodos(todos, elList);
});


elAllBtn.addEventListener("click", function () {
  elList.innerHTML = null;
  renderTodos(todos, elList);
});


elCompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => todo.isCompleted);
  elList.innerHTML = null;
  renderTodos(filteredComplete, elList);
});


elUncompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => !todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(filteredComplete, elList);
});



