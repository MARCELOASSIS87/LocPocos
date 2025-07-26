#!/bin/bash

# Este script automatiza o processo de commit e push para a branch master.

# Garante que o script irá parar imediatamente se qualquer comando falhar.
set -e

# 1. Pede ao usuário para inserir uma mensagem de commit.
echo "🔵 Por favor, digite a mensagem do seu commit e pressione [ENTER]:"
read COMMIT_MESSAGE

# 2. Verifica se a mensagem de commit não está vazia.
if [ -z "$COMMIT_MESSAGE" ]; then
  echo "❌ A mensagem de commit não pode ser vazia. Abortando."
  exit 1
fi

echo "----------------------------------------"

# 3. Adiciona todas as alterações ao stage (arquivos novos, modificados e deletados).
echo "🔄 Adicionando todas as alterações ao Git..."
git add .

# 4. Faz o commit com a mensagem fornecida pelo usuário.
echo "📝 Realizando o commit com a mensagem: '$COMMIT_MESSAGE'"
git commit -m "$COMMIT_MESSAGE"

# 5. Envia as alterações para a branch 'master' no repositório remoto 'origin'.
echo "🚀 Enviando alterações para a branch 'master'..."
git push origin master

echo "----------------------------------------"
echo "✅ Sucesso! Suas alterações foram enviadas para a branch 'master'."