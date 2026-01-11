// Função para salvar todas as tarefas no localStorage
function salvar() {
    const tarefas = [];

    // Coleta todas as tarefas da lista
    document.querySelectorAll(".todo-item").forEach(li => {
        tarefas.push({
            texto: li.querySelector(".todo-text").textContent,
            concluida: li.classList.contains("completed")
        });
    });

    // Salva no localStorage como JSON
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

// Carrega as tarefas salvas ao abrir a página
window.onload = () => {
    const dados = localStorage.getItem("minhasTarefas");
    if (dados) {
        const listaSalva = JSON.parse(dados);
        // Recria cada tarefa salva
        listaSalva.forEach(tarefa => criar(tarefa.texto, tarefa.concluida));
    }
};

// Função para criar uma nova tarefa na lista
function criar(textoSalvo = null, estaConcluida = false) {
    // Obtém o valor do input ou usa o texto salvo
    const input = document.querySelector("input");
    const texto = textoSalvo || input.value.trim();

    // Não cria tarefa se estiver vazia
    if (!texto) return;

    // Cria o elemento da tarefa
    const li = document.createElement("li");
    li.className = "todo-item";
    if (estaConcluida) li.classList.add("completed");

    // Define o HTML da tarefa
    li.innerHTML = `
        <span class="todo-text">${texto}</span>
        <div class="box">
            <button class="btn-concluir">Concluir</button>
            <button class="btn-eliminar">Eliminar</button>
        </div>
    `;

    // Adiciona à lista
    document.querySelector("ul").appendChild(li);
    input.value = ""; // Limpa o input

    // Evento para marcar como concluída
    li.querySelector(".btn-concluir").onclick = () => {
        li.classList.toggle("completed");
        salvar(); // Salva após mudança
    };

    // Evento para excluir tarefa
    li.querySelector(".btn-eliminar").onclick = () => {
        li.remove();
        salvar(); // Salva após exclusão
    };

    // Salva a nova tarefa
    salvar();
}
