// note: ai was used to help create some code 

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.querySelector('input[name="listItem"]');
    const addTaskButton = document.getElementById('enterButton');

    // Add a new task when the enter button is clicked
    addTaskButton.addEventListener('click', addTask);

    // Add a new task when the Enter key is pressed
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('dblclick', editTask);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => li.remove());

        const moveUpButton = document.createElement('button');
        moveUpButton.classList.add('move');
        moveUpButton.textContent = '↑';
        moveUpButton.addEventListener('click', () => moveTask(li, 'up'));

        const moveDownButton = document.createElement('button');
        moveDownButton.classList.add('move');
        moveDownButton.textContent = '↓';
        moveDownButton.addEventListener('click', () => moveTask(li, 'down'));

        li.appendChild(taskSpan);
        li.appendChild(deleteButton);
        li.appendChild(moveUpButton);
        li.appendChild(moveDownButton);

        taskList.appendChild(li);
        newTaskInput.value = '';
    }

    // Function to edit a task
    function editTask(event) {
        const taskSpan = event.target;
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        taskSpan.replaceWith(input);
        input.focus();

        input.addEventListener('blur', () => {
            taskSpan.textContent = input.value.trim() || currentText;
            input.replaceWith(taskSpan);
        });

        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                input.blur();
            }
        });
    }

    // Function to move a task up or down
    function moveTask(taskItem, direction) {
        if (direction === 'up' && taskItem.previousElementSibling) {
            taskList.insertBefore(taskItem, taskItem.previousElementSibling);
        } else if (direction === 'down' && taskItem.nextElementSibling) {
            taskList.insertBefore(taskItem.nextElementSibling, taskItem);
        }
    }
});
