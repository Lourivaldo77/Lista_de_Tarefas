# TODO.md - Plano de Melhorias

## Status: Concluído ✅

### Informações Coletadas:
- **HTML**: Estrutura básica existente, mas faltam elementos necessários para o JavaScript funcionar (formulário, classes corretas)
- **JavaScript**: Código bem estruturado com localStorage, mas referencia elementos inexistentes no HTML
- **CSS**: Design moderno com variáveis CSS, mas precisa de melhorias

### Problemas Identificados:
1. O botão "Adicionar" usa `onclick="criar()"` mas a função não existe
2. O JavaScript procura por `form`, `.btn-adicionar` que não existem no HTML
3. Falta estrutura de formulário
4. Não há filtros de tarefas
5. Não há contador de tarefas
6. Não há opção de editar tarefas visível
7. Não há estado vazio quando não há tarefas

### Plano de Implementação:

#### 1. Atualizar index.html
- Adicionar classe ao botão "Adicionar"
- Adicionar filtros (Todas, Pendentes, Concluídas)
- Adicionar contador de tarefas
- Adicionar mensagem de estado vazio
- Melhorar estrutura semântica

#### 2. Atualizar Script.js
- Corrigir a função de adicionar tarefa (criar)
- Implementar funcionalidade de editar tarefa
- Adicionar filtros de tarefas
- Adicionar contador de tarefas
- Adicionar animation ao adicionar/remover tarefas

#### 3. Atualizar style.css
- Melhorar o design geral
- Adicionar animations
- Melhorar responsividade
- Adicionar estilos para filtros
- Adicionar estilos para contador
- Adicionar estados de hover e focus

### Funcionalidades a Adicionar:
- [x] Corrigir funcionalidade básica de adicionar tarefa
- [x] Filtros: Todas, Pendentes, Concluídas
- [x] Contador de tarefas total/pendentes/concluídas
- [x] Editar tarefa
- [x] Animação ao adicionar/remover tarefas
- [x] Mensagem quando lista vazia
- [x] Melhorar design visual
- [x] Input com placeholder melhorado
- [x] Tecla Enter para adicionar tarefa
- [x] Limpar input após adicionar

### Passos para Execução:
1. Atualizar index.html com estrutura completa
2. Atualizar Script.js com todas as funcionalidades
3. Atualizar style.css com melhorias visuais
4. Testar o funcionamento

