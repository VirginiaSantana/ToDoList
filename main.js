// Obtener referencia a los elementos del DOM
const getTasksButton = document.getElementById('get-tasks');
const taskListElement = document.getElementById('task-list');
const taskForm = document.querySelector('.formulario-de-tarea'); // Cambiar el selector a la clase
const addTitleInput = document.getElementById('add-title');
const addTaskButton = document.getElementById('add-task-button');

// Función asíncrona para mostrar las tareas obtenidas desde el servidor
async function showTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks'); // Realizar una solicitud GET al servidor
        const data = await response.json(); // Convertir la respuesta en formato JSON

        taskListElement.innerHTML = ''; // Limpiar la lista antes de mostrar nuevas tareas

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

// Agregar evento de clic al botón "Get tasks" para mostrar las tareas
getTasksButton.addEventListener('click', showTasks);

// Función asíncrona para agregar una nueva tarea al servidor
async function addTask(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const title = addTitleInput.value;

    if (!title) {
        console.error('Title is required');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (response.status === 201) {
            console.log('Task added successfully');
            showTasks();
        } else {
            console.error('Error adding task:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Agregar evento de envío al formulario para agregar una nueva tarea
taskForm.addEventListener('submit', addTask);
document.addEventListener("DOMContentLoaded",  showTasks); 