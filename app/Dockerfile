# Estágio de compilação
FROM node:20-bullseye AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./

# Instalar dependências com configurações para Node.js 22.16
RUN NODE_OPTIONS="--no-warnings" npm ci

# Copiar o código fonte
COPY . .

# Construir a aplicação
RUN NODE_OPTIONS="--no-warnings" npm run build

# Estágio de produção
FROM node:20-alpine AS production

WORKDIR /app

# Copiar apenas os arquivos necessários do estágio de compilação
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/db.json ./db.json
COPY --from=builder /app/start.sh ./

# Tornar o script de inicialização executável
RUN chmod +x ./start.sh

# Expor a porta
EXPOSE 3000
EXPOSE 3001

# Configurar variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-warnings"

# Iniciar o servidor usando o script start.sh
CMD ["sh", "./start.sh"]