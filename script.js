const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const logTaskCount = function () {
    console.log("Nombre de tâches :", taskList.children.length);
}


function displayTask(taskText) {

    const li = document.createElement('li');
    const textNode = document.createTextNode(taskText + " ");
    li.appendChild(textNode);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.addEventListener('click', function() {
    const index = Array.from(taskList.children).indexOf(li);

    fetch('http://127.0.0.1:5000/tasks/' + index, { method: 'DELETE' })

        .then(function(response) {

            return response.json();
        })

        .then(function(data) {

            if (data.success) {

                taskList.removeChild(li);
                logTaskCount();
            }
        });
});

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    console.log("Avant l'envoi de la tâche au serveur :", taskText);

    fetch('http://127.0.0.1:5000/tasks', {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: taskText})
    })

    .then(response => response.json())
    .then(data => {

        if (data.success) {

            console.log("Réponse du serveur reçue :", data.task);
            displayTask(data.task);
            logTaskCount();
            taskInput.value = '';
        }
    });

    console.log("Après l'envoi de la tâche (avant la réponse du serveur)");
}


window.addEventListener('DOMContentLoaded', () => {

    fetch('http://127.0.0.1:5000/tasks')

        .then(function(response) {

            return response.json();
        })

        .then(function(data) {

            data.forEach(function(task) {

                displayTask(task);
            });

            logTaskCount();

        });
});


addTaskBtn.addEventListener('click',addTask)
taskInput.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        addTask()
    }
})

