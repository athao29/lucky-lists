// NOTE: COPILOT AI WAS USED TO HELP WRITE AND MODIFY SOME FUNCTIONS 

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.querySelector('input[name="listItem"]');
    const addTaskButton = document.getElementById('saveButton');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // ADD TASK ITEM TO THE LIST
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // ITEM FUNCTIONS
        const editButton = document.createElement('button');
        editButton.textContent = 'edit';
        editButton.addEventListener('click', () => editTask(li, taskSpan));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
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
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(moveUpButton);
        li.appendChild(moveDownButton);

        taskList.appendChild(li);
        newTaskInput.value = '';
    }

    // EDIT A TASK ITEM IN THE LIST
    function editTask(li, taskSpan) {
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

    // MOVES A TASK ITEM UP OR DOWN IN THE LIST
    function moveTask(taskItem, direction) {
        if (direction === 'up' && taskItem.previousElementSibling) {
            taskList.insertBefore(taskItem, taskItem.previousElementSibling);
        } else if (direction === 'down' && taskItem.nextElementSibling) {
            taskList.insertBefore(taskItem.nextElementSibling, taskItem);
        }
    }
});