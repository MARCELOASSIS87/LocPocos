
# 🔧 Ajustes no Fluxo do Motorista - MVP

## ❌ Remover cadastro de motoristas pelo admin

### Tarefa 1: Remover rota de criação de motorista do painel admin
- [ ] Verificar se existe endpoint no backend que permite criação de motorista autenticado como admin
- [ ] Remover essa rota ou proteger com verificação de permissão (bloquear para admin)
- [ ] Remover botão ou link "Cadastrar Motorista" do painel admin (frontend)

### Tarefa 2: Manter apenas aprovação e visualização de motoristas
- [ ] Garantir que o admin veja apenas motoristas pendentes/ativos para aprovação ou bloqueio
- [ ] Permitir acesso aos documentos enviados
- [ ] Ações disponíveis: Aprovar, Recusar, Bloquear, Desbloquear

---

## ✅ Ajuste de redirecionamento e Sidebar do motorista

### Tarefa 3: Redirecionar login do motorista para sua dashboard específica
- [ ] Verificar tipo de usuário no login (ex: role = 'motorista')
- [ ] Redirecionar para /dashboard-motorista (ou rota equivalente)

### Tarefa 4: Exibir sidebar personalizada para motorista
- [ ] Criar componente de sidebar específico para o papel 'motorista'
- [ ] Itens da sidebar: Carros Disponíveis, Meus Aluguéis, Avaliações, Sair
- [ ] Garantir que a sidebar do admin e do motorista não se misturem

---

📌 Essas tarefas são independentes e podem ser atribuídas separadamente no Codex ou GitHub.
