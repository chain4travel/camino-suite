ARG BUILD_ENV="build:dev"

FROM node:16
ARG BUILD_ENV
WORKDIR /app/camino-suite

COPY ./ /app/camino-suite/
RUN yarn install
RUN yarn $BUILD_ENV
