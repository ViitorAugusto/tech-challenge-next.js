FROM node:20-bullseye AS builder

WORKDIR /app

COPY packages/backend/package*.json ./

RUN npm install

COPY packages/backend/db.json ./db.json
COPY packages/backend/server.js ./server.js

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/db.json ./db.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "server.js"]