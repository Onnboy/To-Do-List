const API_URL = 'http://localhost:3000/tasks';

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
 * Atualiza uma tarefa existente no servidor.
 * @param {string|number} taskId - O ID da tarefa a ser atualizada.
 * @param {object} updateData - O objeto completo da tarefa com os dados atualizados.
 * @returns {Promise<object|null>} Uma promessa que resolve para o objeto da tarefa atualizada ou null em caso de erro.
 */
const updateTask = async (taskId, updateData) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT', // PUT substitui o recurso inteiro com os novos dados
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