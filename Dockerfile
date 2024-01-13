FROM node:20-slim AS builder
WORKDIR /app
RUN npm i -g pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install -r --offline && pnpm run build && pnpm prune --prod

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD ["node", "build/index.js"]