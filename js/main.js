document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const loadTasks = async () => {
        const tasksFromAPI = await getTasks();

        tasksFromAPI.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.dataset.id = task.id;
            taskItem.className = `task-item ${task.done ? 'done' : 'pending'}`;

            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = task.text;
            taskItem.appendChild(taskTextSpan);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remover';
            taskItem.appendChild(removeBtn);

            taskList.appendChild(taskItem);
        });
    };

    loadTasks();

    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTaskData = {
                text: taskText,
                done: false,
            };

            const createdTask = await createTask(newTaskData);

            if (createdTask) {
                const taskItem = document.createElement('li');
                taskItem.dataset.id = createdTask.id; 
                taskItem.className = 'task-item pending';

                const taskTextSpan = document.createElement('span');
                taskTextSpan.className = 'task-text';
                taskTextSpan.textContent = createdTask.text;
                taskItem.appendChild(taskTextSpan);

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = 'Remover';
                taskItem.appendChild(removeBtn);

                taskList.appendChild(taskItem);

                taskInput.value = '';
                taskInput.focus();
            }
        }
    });

    taskList.addEventListener('click', async (event) => {
        const taskItem = event.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.id;

        if (event.target.classList.contains('remove-btn')) {
            const success = await deleteTask(taskId);
            if (success) {
                taskItem.remove();
            }
        } else {
            taskItem.classList.toggle('done');
            taskItem.classList.toggle('pending');
        }
    });

    taskList.addEventListener('dblclick', (event) => {
        const taskItem = event.target.closest('.task-item');
        if (!taskItem || !event.target.classList.contains('task-text')) return;

        const taskTextSpan = event.target;
        const currentText = taskTextSpan.textContent;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.className = 'edit-input';

        taskItem.replaceChild(editInput, taskTextSpan);
        editInput.focus();

        const saveChanges = () => {
            const newText = editInput.value.trim();
            taskTextSpan.textContent = newText || currentText;
            taskItem.replaceChild(taskTextSpan, editInput);
        };

        editInput.addEventListener('blur', saveChanges);

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveChanges();
            }
        });
    });
});