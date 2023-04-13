# Builder handles setting up a pruned workspace for the component
FROM node:16-buster-slim AS builder

WORKDIR /app
RUN yarn global add turbo@1.8.2
COPY . .
RUN rm -rf /app/node_modules && \
    npx pnpm install && \
    npx turbo prune --scope=gateway --docker

# Installer handles installing dependencies based on pruned workspace
FROM node:16-buster-slim AS installer

WORKDIR /app
RUN corepack enable pnpm
RUN corepack prepare pnpm@7.28.0

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch

RUN pnpm install --offline

# Build the project and its dependencies
COPY --from=builder /app/out/json/ .
COPY turbo.json turbo.json

ENV NODE_ENV production

RUN pnpm turbo run build --filter=gateway...

FROM node:16-buster-slim AS runner

# Needed for sentry-cli
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates dumb-init

# Add user so that we run as non-root
RUN groupadd app && useradd -g app app

# Create writable dir
RUN mkdir /app/ /home/app && chown app:app /app/ /home/app

# Switch to app user
USER app
WORKDIR /app

COPY --chown=app:app --from=installer /app .

EXPOSE 4020

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD node components/algolia/dist/http/index.js
