const API_URL = '/tasks';

/**
 * @returns {Promise<Array>}
 */
const getTasks = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar tarefas da API:", error);
        return [];
    }
};

/**
 * @param {object} taskData
 * @returns {Promise<object|null>}
 */
const createTask = async (taskData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar tarefa: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao criar tarefa:", error);
        return null;
    }
};

/**
 * @param {string|number} taskId
 * @returns {Promise<boolean>} 
 */
const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao remover tarefa: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error("Falha ao remover tarefa:", error);
        return false;
    }
};

/**
 * @param {string|number} taskId 
 * @param {object} updateData 
 * @returns {Promise<object|null>} 
 */
const updateTask = async (taskId, updateData) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar tarefa: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao atualizar tarefa:", error);
        return null;
    }
};