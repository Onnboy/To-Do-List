# To-Do List - Projeto de Curso

Este é um projeto de uma aplicação de Lista de Tarefas (To-Do List) e foi desenvolvida com HTML, CSS e JavaScript. A aplicação permite que o usuário adicione, edite, remova e marque tarefas como concluídas, com persistência de dados através de uma API REST simulada com `json-server`.

## Funcionalidades

-   **Adicionar Tarefas:** Criação de novas tarefas através de um campo de input.
-   **Visualizar Tarefas:** Exibição da lista de tarefas, diferenciando visualmente as que estão pendentes das concluídas.
-   **Marcar como Concluída:** Altera o estado de uma tarefa com um único clique, aplicando um estilo de "riscado" ao texto.
-   **Remover Tarefas:** Exclui tarefas da lista de forma permanente através do botão "Remover".
-   **Editar Tarefas:** Permite a edição do texto de uma tarefa com um duplo clique diretamente na lista.
-   **Persistência de Dados:** Todas as alterações são salvas e sincronizadas com um servidor de API.

## Tecnologias Utilizadas
    -   **HTML5**
    -   **CSS3**
    -   **JavaScript (DOM, Eventos, LocalStorage, Fetch API)** 
-   **API (Simulada):**
    -   [JSON Server] (https://github.com/typicode/json-server) para simular backend com `db.json`

## Como Executar o Projeto

Antes de começar, você precisará ter o Node.js (que inclui o npm) instalado em sua máquina. A instalação varia de acordo com o sistema operacional, para isso, deixo links para redirecionar para as páginas oficiais de ambas. [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/)

### 1. Clone o Repositório e acesse-o localmente

```bash
git clone https://github.com/Onnboy/To-Do-List.git
cd To-Do-List
```

### 2. Instale as Dependências

Este comando irá ler o arquivo `package.json` e instalar o `json-server` como uma dependência local do projeto.

```bash
npm install
```

### 2. Inicie o Servidor

Com a abordagem de porta única para ambas aplicações, você só precisa de um comando. Em um terminal, na raiz do projeto, execute:

```bash
npm start
```

Este comando fará duas coisas:
1.  Iniciará a API REST, que responderá em `http://localhost:3000 ou 127.0.0.1:3000 e pra visualizar tarefas em json é /tasks`.
2.  Servirá os arquivos estáticos da pasta `public/` na raiz `http://localhost:3000 ou 127.0.0.1:3000/`.

### 3. Acesse a Aplicação

Abra seu navegador e acesse a seguinte URL:

**`http://localhost ou 127.0.0.1:3000/`**

** Nota: Lembre-se que, você precisará atualizar a página manualmente (`F5`) para ver as alterações feitas nos arquivos de código. Isso visualizando o endpoint /tasks. **
