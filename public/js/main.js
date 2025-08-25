document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');


    const updateTaskCounter = () => {
        const totalTasks = tasksState.length;
        const pendingTasks = tasksState.filter(task => !task.done).length;

        if (totalTasks === 0) {
            taskCounter.textContent = 'Nenhuma tarefa na lista.';
        } else {
            taskCounter.textContent = `${pendingTasks} pendente(s) de ${totalTasks} no total`;
        }
    };

    const renderAllTasks = () => {
        taskList.innerHTML = '';
        tasksState.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
        updateTaskCounter();
    };

    /**
     * @param {object} task
     * @returns {HTMLElement}
     */
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        if (task.done) {
            li.classList.add('done');
        }

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remover';

        li.appendChild(span);
        li.appendChild(removeBtn);

        return li;
    };

    const initializeApp = async () => {
        tasksState = await getTasks();
        renderAllTasks();
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;

        const createdTask = await createTask({ text, done: false });
        if (createdTask) {
            tasksState.push(createdTask);
            renderAllTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    };

    const handleListClick = async (e) => {
        const taskElement = e.target.closest('.task-item');
        if (!taskElement) return;

        const taskId = taskElement.dataset.id;
        const task = tasksState.find(t => t.id === taskId);
        if (!task) return;

        if (e.target.classList.contains('remove-btn')) {
            const success = await deleteTask(taskId);
            if (success) {
                tasksState = tasksState.filter(t => t.id !== taskId);
                renderAllTasks();
            }
        } else if (e.target.classList.contains('task-text')) {
            const updatedTaskData = { ...task, done: !task.done };
            const updatedTask = await updateTask(taskId, updatedTaskData);
            if (updatedTask) {
                const taskIndex = tasksState.findIndex(t => t.id === taskId);
                tasksState[taskIndex] = updatedTask;
                renderAllTasks();
            }
        }
    };

    const handleListDoubleClick = (e) => {
        const span = e.target;
        if (!span.classList.contains('task-text')) return;

        const taskElement = span.closest('.task-item');
        const originalText = span.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = originalText;

        span.replaceWith(input);
        input.focus();

        const saveChanges = async () => {
            const newText = input.value.trim();
            const taskId = taskElement.dataset.id;
            const task = tasksState.find(t => t.id === taskId);

            if (newText && newText !== originalText && task) {
                const updatedTask = await updateTask(taskId, { ...task, text: newText });
                tasksState = tasksState.map(t => t.id === taskId ? updatedTask : t);
            }
            renderAllTasks();
        };

        input.addEventListener('blur', saveChanges);
        input.addEventListener('keydown', (event) => event.key === 'Enter' && input.blur());
    };

    taskForm.addEventListener('submit', handleAddTask);
    taskList.addEventListener('click', handleListClick);
    taskList.addEventListener('dblclick', handleListDoubleClick);

    initializeApp();
});