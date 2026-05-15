# syntax=docker/dockerfile:1

# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:24-slim as base
## Enable corepack and activate pnpm.
RUN corepack enable && corepack prepare pnpm@11.1.2 --activate
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage: Production build mode.
FROM base as prod
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY . /opt/docusaurus/
## Install dependencies with `--immutable` to ensure reproducibility.

ARG STAKING_API_URL
ENV STAKING_API_URL=$STAKING_API_URL

ARG STAKING_API_DOC_JSON_URL
ENV STAKING_API_DOC_JSON_URL=$STAKING_API_DOC_JSON_URL

ARG APP_URL
ENV APP_URL=$APP_URL

ARG CHATWOOT_WEBSITE_TOKEN
ENV CHATWOOT_WEBSITE_TOKEN=$CHATWOOT_WEBSITE_TOKEN

ARG CHATWOOT_BASE_URL
ENV CHATWOOT_BASE_URL=$CHATWOOT_BASE_URL

ARG CHATWOOT_ENABLED
ENV CHATWOOT_ENABLED=$CHATWOOT_ENABLED

RUN pnpm install --frozen-lockfile
## Build the static site.
RUN pnpm run build

# Serve with `docusaurus serve`.
FROM prod as serve
## Expose the port that Docusaurus will run on.
EXPOSE 3000
## Run the production server.
# CMD ["npm", "run", "serve", "--host 0.0.0.0", "--no-open"]
CMD ["node_modules/.bin/docusaurus", "serve", "--host", "0.0.0.0", "--no-open"]
