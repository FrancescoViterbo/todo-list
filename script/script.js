// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const alerts = document.getElementById('alerts')

// Event Listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// todoButton.addEventListener('click', addTodo);

// Functions

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value === "") {
        alerts.innerHTML = "You must write something before creating a new task";
    } else {
        alerts.innerHTML = "";
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<img src="img/icons8-check-file-64.png" alt="completed">';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="img/icons8-empty-trash-64.png" alt="completed">'
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        var height = todo.offsetHeight;
        height = height.toString() + "px";
        const text = todo.children[0];
        const check = todo.children[1];
        check.classList.add("disappear");
        todo.style.height = height;
        check.addEventListener('animationend', function(){
            item.classList.add("align-right");
            check.remove();
            text.classList.add("fall");
            text.addEventListener('animationend', function(){
                todo.remove();
            })
        })
    } else if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}