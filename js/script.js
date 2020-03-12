const ulElement = document.querySelector("[data-list]");

// GET TODO LISTS FROM STORAGE
const todos = JSON.parse(localStorage.getItem("list_todos")) || [];

// RENDER TODO
function renderTodo() {
  ulElement.innerHTML = "";
  for (const todo of todos) {
    // Criar lista com os elementos
    const listElement = document.createElement("li");
    const textListElement = document.createTextNode(todo);
    listElement.appendChild(textListElement);
    ulElement.appendChild(listElement);
    // Adicionar link para excluir os elementos
    const posicao = todos.indexOf(todo);
    const linkElement = document.createElement("a");
    const recycleBin = document.createElement("img");
    recycleBin.setAttribute("src", "./recycle-bin.png");
    linkElement.setAttribute("href", "#");
    listElement.appendChild(linkElement);
    // Adicionar evento de click para exclusão dos itens

    linkElement.setAttribute("onclick", 'deleteTodo("' + posicao + '")');

    linkElement.appendChild(recycleBin);
  }
}

renderTodo();

// ADD NEW TODO
const adicionarNovaTarefa = document.querySelector("[data-btn]");
function addTodo() {
  const novaTarefa = document.querySelector("[data-nova-tarefa]");
  const conteudoNovaTarefa = novaTarefa.value;

  // Verificar se o usuário preencheu ou campo de adicionar nova todo
  if (conteudoNovaTarefa === "") {
    document.querySelector("[data-aviso]").classList.add("ativo");
    setTimeout(() => {
      document.querySelector("[data-aviso]").classList.remove("ativo");
    }, 1500);
  } else {
    todos.push(conteudoNovaTarefa);
    novaTarefa.value = "";
    saveToStorage();
    renderTodo();
  }
}

adicionarNovaTarefa.addEventListener("click", addTodo);

// DELETE TODO
function deleteTodo(posicao) {
  todos.splice(posicao, 1);
  saveToStorage();
  renderTodo();
}

// SAVE TODO LIST TO STORAGE
function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}
