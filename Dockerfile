# Base image
FROM node:18-bookworm-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./
# Install app dependencies
RUN yarn global add @nestjs/cli
RUN yarn install --frozen-lockfile --production
# Bundle app source
COPY . .
# Creates a "dist" folder with the production build
RUN yarn run build

# build production artifacts stage
FROM node:14-alpine AS deploy
RUN apk add dumb-init
USER node

WORKDIR /app

COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

# Start the server using the production build
CMD [ "dumb-init", "node", "dist/main.js" ]
