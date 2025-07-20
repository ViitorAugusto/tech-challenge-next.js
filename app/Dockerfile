# Estágio de compilação
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci

# Copiar o código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM node:24-alpine AS production

WORKDIR /app

# Copiar apenas os arquivos necessários do estágio de compilação
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/db.json ./db.json

# Expor a porta
EXPOSE 3000
EXPOSE 3001

# Configurar variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Iniciar o servidor Next.js e o JSON Server
CMD npm run json-server & npm start