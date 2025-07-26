FROM node:20-bullseye AS builder

WORKDIR /app

COPY packages/frontend/package*.json ./
COPY packages/frontend/next.config.ts ./
COPY packages/frontend/tsconfig.json ./
COPY packages/frontend/postcss.config.mjs ./postcss.config.mjs

RUN NODE_OPTIONS="--no-warnings" npm install --frozen-lockfile

COPY packages/frontend/src ./src
COPY packages/frontend/public ./public

RUN NODE_OPTIONS="--no-warnings" npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-warnings"

CMD ["npm", "start"]