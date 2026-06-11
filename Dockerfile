# syntax=docker/dockerfile:1.7

ARG BUN_VERSION=1.3.13
ARG NODE_VERSION=22-alpine

FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
  bun install --frozen-lockfile

FROM deps AS build
ARG APP_VERSION
ARG APP_COMMIT
ENV APP_VERSION=${APP_VERSION}
ENV APP_COMMIT=${APP_COMMIT}
WORKDIR /app
COPY . .
RUN bun run check
RUN bun run test
RUN bun run build

FROM oven/bun:${BUN_VERSION}-alpine AS production-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
  bun install --frozen-lockfile --production

FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app
RUN addgroup -S app && adduser -S app -G app

COPY --from=production-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/build ./build
COPY --from=build --chown=app:app /app/package.json ./package.json

USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "const port = process.env.PORT || 3000; fetch('http://127.0.0.1:' + port + '/health').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1));"]
CMD ["node", "build"]
