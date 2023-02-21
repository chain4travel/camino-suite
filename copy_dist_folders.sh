#!/usr/bin/env bash

echo "NOTE: This script doesn't build modules. It only copies directories"
SUITE_DIR=$( dirname -- "${BASH_SOURCE[0]}" )
echo "camino-suite dir: $SUITE_DIR"
if [ -z "$SUITE_DIST" ]
then
    SUITE_DIST="$SUITE_DIR/dist"
fi

if [ ! -d "$SUITE_DIST" ]
then
    echo "ERROR: no dist folder for camino-suite"
    echo "Please build camino-suite first. you can use yarn build"
    exit 0
fi

if [ -z "$WALLET_DIST" ]
then
    echo "ERROR: environment variable WALLET_DIST is not set"
    echo "Please set env variable WALLET_DIST to the path of the dist folder of the wallet"
    exit 0
fi

if [ ! -d "$WALLET_DIST" ]
then
    echo "ERROR: $WALLET_DIST is not found"
    echo "Please set WALLET_DIST to an existing path. you may need to build camino-wallet first"
    exit 0
fi

if [ -z "$EXPLORER_DIST" ]
then
    echo "ERROR: environment variable EXPLORER_DIST is not set"
    echo "Please set env variable EXPLORER_DIST to the path of the dist folder of the explorer"
    exit 0
fi

if [ ! -d "$EXPLORER_DIST" ]
then
    echo "ERROR: $EXPLORER_DIST is not found"
    echo "Please set EXPLORER_DIST to an existing path. you may need to build camino-block-explorer first"
    exit 0
fi

rm -rf $SUITE_DIST/wallet $SUITE_DIST/explorer
cp -ar $WALLET_DIST $SUITE_DIST/wallet
cp -ar $EXPLORER_DIST $SUITE_DIST/explorer

echo "DONE"
exit 0

