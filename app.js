//Enviar formulario (con Enter o botón Submit)
const todoForm = document.querySelector(".todo-form");
//let tasks = []; (No se puede redeclarar esta variable y está en la línea 131)

todoForm.addEventListener("submit", function(e) {
// 1 
e.preventDefault();
// 2 
const input = this.name;
const inputValue = input.value;

if (inputValue != "") {
    // 3 
    const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false
    };
    // 4 
    tasks.push(task);
    // 5 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // 6 
    createTask(task);
    // 7 
    todoForm.reset();
}
// 8 
input.focus();
}); 

//Crear una tarea.
function createTask(task) {
    const taskEl = document.createElement("li");
    taskEl.setAttribute("id", task.id);
    const taskElMarkup = `
<div class="checkbox-wrapper">
<input type="checkbox" id="${task.name}-${task.id}" name="tasks" ${
task.isCompleted ? "checked" : ""
    }>
<label for="${task.name}-${task.id}">
<svg class="checkbox-empty">
<use xlink:href="#checkbox_empty"></use>
</svg>
<svg class="checkmark">
<use xlink:href="#checkmark"></use>
</svg>
</label>
<span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
</div>
<button class="remove-task" title="Remove ${task.name} task">
<svg>  
<use xlink:href="#close"></use>
</svg>
</button>
`;
    taskEl.innerHTML = taskElMarkup;
    todoList.appendChild(taskEl);
    countTasks();
}

//Actualizar una tarea.
todoList.addEventListener("input", (e) => {

    const taskId = e.target.closest("li").id;
    updateTask(taskId, e.target);
});
function updateTask(taskId, el) {
    // 1
    const task = tasks.find((task) => task.id === parseInt(taskId));
    if (el.hasAttribute("contentEditable")) {
    // 2
    task.name = el.textContent;
    } else {
    // 3
    const span = el.nextElementSibling.nextElementSibling;
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
        span.removeAttribute("contenteditable");
        el.setAttribute("checked", "");
    } else {
        el.removeAttribute("checked");
        span.setAttribute("contenteditable", "");
    }
    }
    // 4
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // 5
    countTasks();
}

//Eliminar una tarea.
const todoList = document.querySelector(".todo-list");

todoList.addEventListener("click", (e) => {
  // 1
if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task")
) {
    // 2
    const taskId = e.target.closest("li").id;
    // 3
    removeTask(taskId);
}
});
function removeTask(taskId) {
    // 1
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    // 2
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // 3
    document.getElementById(taskId).remove();
    // 4
    countTasks();
}

//Contar las tareas.
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");

function countTasks() {
totalTasks.textContent = tasks.length;
const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
completedTasks.textContent = completedTasksArray.length;
remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

//Conservar los datos al cargar la página.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
tasks.map((task) => {
    createTask(task);
});
}

