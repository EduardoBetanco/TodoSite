const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const logTaskCount = function () {
    console.log("Nombre de tâches :", taskList.children.length);
}

function addTask() {

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Suppprimer';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        logTaskCount()
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    logTaskCount()
}


addTaskBtn.addEventListener('click',addTask)


taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask()
    }
});




