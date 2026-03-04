// Lista de Tarefas - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    
    // Contadores
    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const completedCount = document.getElementById('completed-count');
    
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Estado da aplicação
    let currentFilter = 'all';
    let tarefas = [];

    // --- Funções Principais ---

    /**
     * Salva as tarefas no localStorage
     */
    function salvarTarefas() {
        localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    }

    /**
     * Carrega as tarefas do localStorage
     */
    function carregarTarefas() {
        const dados = localStorage.getItem('minhasTarefas');
        if (dados) {
            tarefas = JSON.parse(dados);
            renderizarTarefas();
        }
        atualizarContadores();
    }

    /**
     * Cria um elemento de tarefa com checkbox
     */
    function criarElementoTarefa(tarefa, index) {
        const li = document.createElement('li');
        li.className = `todo-item ${tarefa.concluida ? 'completed' : ''}`;
        li.dataset.index = index;

        // Container para checkbox e texto
        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.alignItems = 'center';
        contentWrapper.style.flex = '1';

        // Custom Checkbox
        const checkbox = document.createElement('label');
        checkbox.className = 'todo-checkbox';
        checkbox.innerHTML = `
            <input type="checkbox" ${tarefa.concluida ? 'checked' : ''}>
            <span class="checkmark"></span>
        `;
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = tarefa.texto;

        contentWrapper.append(checkbox, todoText);

        const todoActions = document.createElement('div');
        todoActions.className = 'todo-actions';

        // Botão Concluir (agora é redundante, mas mantemos para editar/eliminar)
        const btnConcluir = document.createElement('button');
        btnConcluir.className = 'btn-action btn-complete';
        btnConcluir.title = tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída';
        btnConcluir.innerHTML = tarefa.concluida ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
        
        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn-action btn-edit';
        btnEditar.title = 'Editar tarefa';
        btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
        
        // Botão Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-action btn-delete';
        btnEliminar.title = 'Eliminar tarefa';
        btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';

        todoActions.append(btnConcluir, btnEditar, btnEliminar);
        li.append(contentWrapper, todoActions);

        // Evento de mudança do checkbox
        checkbox.querySelector('input').addEventListener('change', () => {
            toggleConcluir(index);
        });

        // Adicionar animação de entrada
        li.style.animation = 'slideIn 0.3s ease forwards';

        return li;
    }

    /**
     * Renderiza a lista de tarefas
     */
    function renderizarTarefas() {
        todoList.innerHTML = '';
        
        const tarefasFiltradas = tarefas.filter(tarefa => {
            if (currentFilter === 'pending') return !tarefa.concluida;
            if (currentFilter === 'completed') return tarefa.concluida;
            return true;
        });

        if (tarefasFiltradas.length === 0) {
            emptyState.style.display = 'flex';
            todoList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            todoList.style.display = 'block';
            
            tarefasFiltradas.forEach((tarefa, index) => {
                const originalIndex = tarefas.indexOf(tarefa);
                const elementoTarefa = criarElementoTarefa(tarefa, originalIndex);
                todoList.appendChild(elementoTarefa);
            });
        }

        atualizarContadores();
    }

    /**
     * Atualiza os contadores de tarefas
     */
    function atualizarContadores() {
        const total = tarefas.length;
        const pendentes = tarefas.filter(t => !t.concluida).length;
        const concluidas = tarefas.filter(t => t.concluida).length;

        totalCount.textContent = total;
        pendingCount.textContent = pendentes;
        completedCount.textContent = concluidas;
    }

    /**
     * Adiciona uma nova tarefa
     */
    function adicionarTarefa(texto) {
        const novaTarefa = {
            texto: texto.trim(),
            concluida: false,
            createdAt: new Date().toISOString()
        };
        
        tarefas.push(novaTarefa);
        salvarTarefas();
        renderizarTarefas();
        
        // Feedback visual
        todoInput.value = '';
        todoInput.focus();
    }

    /**
     * Alterna o estado de conclusão de uma tarefa
     */
    function toggleConcluir(index) {
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefas();
        renderizarTarefas();
    }

    /**
     * Edita o texto de uma tarefa
     */
    function editarTarefa(index) {
        const li = todoList.querySelector(`[data-index="${index}"]`);
        if (!li) return;

        const todoText = li.querySelector('.todo-text');
        const textoAtual = tarefas[index].texto;

        // Criar input de edição
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = textoAtual;

        // Substituir texto por input
        todoText.style.display = 'none';
        li.insertBefore(editInput, todoText);
        editInput.focus();
        editInput.select();

        // Função para salvar edição
        const salvarEdicao = () => {
            const novoTexto = editInput.value.trim();
            if (novoTexto && novoTexto !== textoAtual) {
                tarefas[index].texto = novoTexto;
                salvarTarefas();
            }
            renderizarTarefas();
        };

        // Eventos para salvar
        editInput.addEventListener('blur', salvarEdicao);
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                editInput.blur();
            }
        });
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                renderizarTarefas();
            }
        });
    }

    /**
     * Remove uma tarefa com animação
     */
    function removerTarefa(index) {
        const li = todoList.querySelector(`[data-index="${index}"]`);
        if (li) {
            li.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            }, 300);
        }
    }

    // --- Event Listeners ---

    // Adicionar tarefa via formulário
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = todoInput.value.trim();
        
        if (!texto) {
            // Efeito de shake no input
            todoInput.classList.add('shake');
            setTimeout(() => todoInput.classList.remove('shake'), 500);
            return;
        }

        adicionarTarefa(texto);
    });

    // Tecla Enter no input também adiciona
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            todoForm.dispatchEvent(new Event('submit'));
        }
    });

    // Delegação de eventos na lista
    todoList.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-action');
        if (!btn) return;

        const li = btn.closest('.todo-item');
        const index = parseInt(li.dataset.index);

        if (btn.classList.contains('btn-complete')) {
            toggleConcluir(index);
        } else if (btn.classList.contains('btn-edit')) {
            editarTarefa(index);
        } else if (btn.classList.contains('btn-delete')) {
            removerTarefa(index);
        }
    });

    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderizarTarefas();
        });
    });

    // Limpar input ao clicar fora
    document.addEventListener('click', (e) => {
        if (!todoForm.contains(e.target) && todoInput.value.trim()) {
            // Opcional: salvar texto parcial
        }
    });

    // --- Inicialização ---
    carregarTarefas();
});

