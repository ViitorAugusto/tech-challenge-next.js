#!/bin/sh
# Captura sinais para desligar corretamente os processos
trap 'kill $(jobs -p) 2>/dev/null' EXIT

# Verifica a versão do Node.js
echo "Usando Node.js $(node --version)"

# Inicia o json-server em segundo plano
echo "Iniciando JSON Server na porta 3001..."
NODE_OPTIONS="--no-warnings" npm run json-server &
JSON_SERVER_PID=$!

# Espera um pouco para que o json-server inicie corretamente
sleep 2

# Inicia o servidor Next.js
echo "Iniciando Next.js na porta 3000..."
NODE_OPTIONS="--no-warnings" npm start

# Se o Next.js for encerrado, também encerra o json-server
kill $JSON_SERVER_PID 2>/dev/null
