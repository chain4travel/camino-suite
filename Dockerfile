# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16 as build-stage-suite

WORKDIR /app/camino-suite

COPY ./ /app/camino-suite/
RUN yarn install
RUN yarn build:stage

FROM node:16 as build-stage-explorer

WORKDIR /app
ARG EXPLORER_BRANCH=suite
RUN git clone -b $EXPLORER_BRANCH https://github.com/chain4travel/camino-block-explorer.git
RUN cd camino-block-explorer && yarn install && yarn build:stage


FROM node:16 as build-stage-wallet

WORKDIR /app
ARG WALLET_BRANCH=suite
RUN git clone -b $EXPLORER_BRANCH https://github.com/chain4travel/camino-wallet.git
RUN cd camino-wallet && yarn install && yarn build:stage

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.18
COPY --from=build-stage /app/camino-suite/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/camino-block-explorer/dist/ /usr/share/nginx/html/explorer
COPY --from=build-stage /app/camino-wallet/dist/ /usr/share/nginx/html/wallet
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf