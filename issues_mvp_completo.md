
# 📋 Issues - MVP Completo da Plataforma de Aluguel de Carros

---

## 🚗 FLUXO DO MOTORISTA

### 🟢 Cadastro e Login

- [ ] [Motorista] Criar tela de cadastro com envio de documentos obrigatórios
- [ ] [Motorista] Backend - Upload e validação de documentos
- [ ] [Motorista] Exibir mensagem de “Cadastro em análise” após envio
- [ ] [Motorista] Criar tela de login

### 🟡 Dashboard e Solicitação

- [ ] [Motorista] Criar tela de dashboard com listagem de veículos disponíveis
- [ ] [Motorista] Criar tela de solicitação de aluguel
- [ ] [Motorista] Backend - Enviar solicitação de aluguel ao admin
- [ ] [Motorista] Tela para acompanhamento de status de solicitações

### 🔵 Contrato e Uso do Veículo

- [ ] [Motorista] Exibir contrato digital após aprovação de aluguel
- [ ] [Motorista] Assinatura digital do contrato pelo motorista
- [ ] [Motorista] Exibir status “em uso” após pagamento confirmado

### 🔴 Devolução e Avaliação

- [ ] [Motorista] Criar tela de aluguéis ativos e históricos
- [ ] [Motorista] Liberar avaliação após devolução do veículo
- [ ] [Motorista] Tela de avaliação de aluguel

---

## 🛠️ FLUXO DO ADMINISTRADOR

### 👤 Gestão de Motoristas

- [ ] [Admin] Tela de login exclusiva para administrador
- [ ] [Admin] Listar motoristas pendentes para aprovação
- [ ] [Admin] Visualizar documentos enviados pelos motoristas
- [ ] [Admin] Aprovar ou recusar cadastro de motorista
- [ ] [Admin] Bloquear/desbloquear motorista ativo

### 🚘 Gestão de Veículos

- [ ] [Admin] Tela de cadastro de novo veículo
- [ ] [Admin] Upload de fotos dos veículos
- [ ] [Admin] Alterar status do veículo (disponível, em uso, manutenção)
- [ ] [Admin] Editar dados de veículos existentes

### 📄 Gestão de Solicitações

- [ ] [Admin] Listar solicitações de aluguel pendentes
- [ ] [Admin] Visualizar detalhes da solicitação e do motorista
- [ ] [Admin] Aprovar ou recusar solicitação
- [ ] [Admin] Gerar contrato digital de aluguel
- [ ] [Admin] Marcar pagamento como confirmado (presencial)
- [ ] [Admin] Atualizar status para “em uso”

### 🕓 Pós-Aluguel

- [ ] [Admin] Confirmar devolução do veículo
- [ ] [Admin] Liberar avaliação para o motorista
- [ ] [Admin] Visualizar avaliações recebidas

---

## 📊 RELATÓRIOS E PAINEL ADMIN

- [ ] [Admin] Relatório de motoristas aprovados, pendentes e bloqueados
- [ ] [Admin] Relatório de veículos disponíveis, em uso e em manutenção
- [ ] [Admin] Relatório de aluguéis ativos, encerrados e recusados
- [ ] [Admin] Relatório de avaliações médias dos motoristas
- [ ] [Admin] Relatório financeiro (alugueis por período)

---

## 🔐 INTEGRAÇÕES E SEGURANÇA

- [ ] [Backend] Integração com sistema de assinatura digital (gov.br ou alternativa)
- [ ] [Backend] Criptografar senhas com bcrypt
- [ ] [Backend] Autenticação via JWT
- [ ] [Backend] Middleware de proteção de rotas privadas
- [ ] [Backend] Validação de uploads (tipos e tamanhos permitidos)

