"user strick"

// 1. HTML elementlarni tanlab oldik
let elMoonBtn = document.querySelector(".nav-box__btnMoon");
let elSunBtn = document.querySelector(".nav-box__btnSun");
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

console.log(elClearAllBtn);

// toggle color
elSunBtn.style.display = "none";
elMoonBtn.addEventListener("click", function(){
  elMoonBtn.style.display = "none";
  elSunBtn.style.display = "inline";
  body.classList.toggle('dark-mode');
})

elSunBtn.addEventListener("click", function(){
  elSunBtn.style.display = "none";
  elMoonBtn.style.display = "inline";
  body.classList.toggle('dark-mode');
})


// 2. New array for todos
const todos = [];

// 10. Ul quloq solyabmiz chunki bu EVENT DELEGATION:
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

// 8. Todos arrayini aylanib chiqib har bir objectdagi malumotlarni htmlda uiga chiqarish uchun funksiya
const renderTodos = function (arr, element) {
  elAllCount.textContent = todos.length;
  elCompletedCount.textContent = todos.filter(
    (todo) => todo.isCompleted
  ).length;
  elUnCompletedCount.textContent = todos.filter(function (todo) {
    return !todo.isCompleted;
  }).length;

  arr.forEach(function (todo) {
    let newLi = document.createElement("li");
    let newCheckbox = document.createElement("input");
    let newDeleteBtn = document.createElement("button");

    newCheckbox.type = "checkbox";

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");

    newLi.textContent = todo.title;
    newDeleteBtn.textContent = "X";

    //11. DATASET QO'SHDIK
    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLi.style.textDecoration = "line-through";
    }

    element.appendChild(newLi);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newDeleteBtn);
  });
};

// 3. Formaga clickiga quloq soldik
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // 4. input value
  let inputValue = elInput.value;

  // 5. Har bir todo uchun yangi object yaratib oldik
  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  // 6. Har bit todo objecttini todos arrayiga push qilyabdi
  todos.push(newTodo);

  elList.innerHTML = null;
  elInput.value = null;

  // 9. todolarni render qilyabmiz
  renderTodos(todos, elList);
});

//ALL BUTTON
elAllBtn.addEventListener("click", function () {
  elList.innerHTML = null;

  renderTodos(todos, elList);
});

// COMPLETE BUTTON
elCompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(filteredComplete, elList);
});


// unclapted
elUncompleteBtn.addEventListener("click", function () {
  const filteredComplete = todos.filter((todo) => !todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(filteredComplete, elList);
});


// all clear
elClearAllBtn.addEventListener("click", function() {
  todos = [];
  elList.innerHTML = null;
})


