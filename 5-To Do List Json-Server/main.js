// Obtener referencia a los elementos del DOM
const getTasksButton = document.getElementById('get-tasks');
const addTitleInput = document.getElementById('add-title');
const modifyTaskInput = document.getElementById('modify-task');
const taskListElement = document.getElementById('task-list');
const deleteButton = document.getElementById('delete-task');

// URL de la API (ajusta esto según tu configuración)
const apiUrl = 'http://localhost:3000/tasks';

// Función asíncrona para hacer la llamada GET y mostrar tareas
async function showTasks() {
try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Limpiar la lista de tareas antes de volver a mostrar
    taskListElement.innerHTML = '';

    // Crear elementos de lista (li) para cada tarea y agregarlos al DOM
    data.forEach(task => {
const li = document.createElement('li');
li.textContent = task.title;
taskListElement.appendChild(li);
    });
} catch (error) {
    console.error('Error fetching data:', error);
}
}

// Agregar evento de clic al botón para obtener tareas
getTasksButton.addEventListener('click', showTasks);

// Función asíncrona para agregar una nueva tarea
async function addTask() {
const title = addTitleInput.value;

if (!title) {
    console.error('Title is required');
    return;
}

try {
    const response = await fetch(apiUrl, {
method: 'POST',
headers: {
        'Content-Type': 'application/json',
},
body: JSON.stringify({ title }),
    });

    if (response.status === 201) {
console.log('Task added successfully');
      showTasks(); // Actualizar la lista después de agregar una tarea
    } else {
console.error('Error adding task:', response.statusText);
    }
} catch (error) {
    console.error('Error adding task:', error);
}
}

// Agregar evento de clic al botón para agregar tarea
addTitleButton.addEventListener('click', addTask);
