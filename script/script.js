// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const alerts = document.getElementById('alerts');
const filterOption = document.querySelector(".filter-todo");
const logoutBtn = document.getElementById("logout");
const loginBtn = document.getElementById("login");

// Event Listeners

document.addEventListener('DOMContentLoaded', getName);
loginBtn.addEventListener('click', saveName);
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
logoutBtn.addEventListener('click', logout);

// Functions

function saveName(){
    if (localStorage.getItem("username") === null){
        var name = prompt("Please enter your name", "Your Name Here");  
        logoutBtn.style.display = "none";
        if (name != null) {
            document.getElementById("title").innerHTML = name + "'s Todo List";
            saveLocalName(name);
            logoutBtn.style.display = "inline-block";
        } else {
            document.getElementById("title").innerHTML = "Anonymous Todo List";
            loginBtn.style.display = "inline-block";
        }
        loginBtn.style.display = "none";
    } else {
        name = JSON.parse(localStorage.getItem("username")); 
        document.getElementById("title").innerHTML = name + "'s Todo List";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    }
}

function getName(){
    if (localStorage.getItem("username") !== null){
        logoutBtn.style.display = "inline-block";
        name = JSON.parse(localStorage.getItem("username")); 
        document.getElementById("title").innerHTML = name + "'s Todo List";
        loginBtn.style.display = "none";
    } else {
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
    }
}

function logout(){
    localStorage.removeItem('username');
    document.getElementById("title").innerHTML = "Anonymous Todo List.";
    logoutBtn.style.display = "none";
}

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value === "") {
        alerts.innerHTML = "You must write something before creating a new task";
    } else {
        alerts.innerHTML = "";
        let todos;
        if (localStorage.getItem('todos') === null){
            console.log("item created");
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
            if (todos.includes(todoInput.value)){
                alerts.innerHTML = "You already created a task with this name";
            } else {
                // Add todo to local storage
                saveLocalTodos(todoInput.value);
                const todoDiv = document.createElement('div');
                todoDiv.classList.add("todo");
                // todoDiv.classList.add("uncompleted");
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
    }
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        var height = todo.offsetHeight;
        height = height.toString() + "px";
        var text = todo.children[0];
        const check = todo.children[1];
        check.classList.add("disappear");
        todo.style.height = height;
        check.addEventListener('animationend', function(){
            item.classList.add("align-right");
            check.remove();
            text.classList.add("fall");
            removeLocalTodos(todo);
            text.addEventListener('animationend', function(){
                todo.remove();
            })
        })
    } else if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalName(name){
    localStorage.setItem('username', JSON.stringify(name));
}

function saveLocalTodos(todo){
    // Check if the storage is already populated
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    // Check if the storage is already populated
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // todoDiv.classList.add("uncompleted");
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
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
    });
}

function removeLocalTodos(todo){
    // Check if the storage is already populated
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoName = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoName), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}