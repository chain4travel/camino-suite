# Camino Application Suite

This app uses Module Federation to combine three different applications with different frameworks into a single, cohesive application. The three applications are:

1. Suite App, built with React
2. Camino Explorer, built with React
3. Camino Wallet, built with Vue

## Prerequisites

- Node v16 or higher
- Camino Explorer running
- Camino Wallet running

## Install the dependencies

To get started you need to have explorer and wallet running.

- start explorer
    1. clone the repository

        ```bash
        
        git clone https://github.com/chain4travel/camino-block-explorer
        ```

    2. navigate to the root directory and switch branch to suite

        ```bash

        cd camino-block-explorer && git checkout suite
        ```

    3. install dependencies

        ```bash
        yarn install
        ```

    4. start the development server for the application

        ```bash
        yarn start
        ```

- start wallet
    1. clone the repository

        ```bash
        git clone https://github.com/chain4travel/camino-wallet
        ```

    2. navigate to the root directory and switch branch to suite

        ```bash
        cd camino-wallet && git checkout suite
        ```

    3. install dependencies

        ```bash
        yarn install
        ```

    4. start the development server for the application

        ```bash
        yarn start
        ```

## Getting Started

After successfully running the explorer and wallet, clone this repository and navigate to the root directory in your terminal.
Then, run the following commands:

```bash
yarn install
yarn start
```

This will start the development server for the application.

## Architecture

This application is built using Module Federation, which is a feature of Webpack that allows multiple applications to share code and run in the same context. Each of the three applications in this app is built as a separate Webpack module.
When you start the development server, the application will be served from localhost:5001. Each of the three applications can be accessed at the following URLs:

- Host (React): localhost:5001
- Wallet (Vue): localhost:5001/wallet
- Explorer (React): localhost:5001/explorer
