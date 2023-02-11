

@ECHO OFF 

echo "NOTE: This script doesn't build modules. It only copies directories"
SET SUITE_DIR=%~dp0
echo "camino-suite dir: %SUITE_DIR%"

IF "%SUITE_DIST%"=="" ( 
    SET SUITE_DIST="%SUITE_DIR%\dist\"
) 
    

IF NOT EXIST %SUITE_DIST% (
    echo "ERROR: no dist folder for camino-suite"
    echo "Please build camino-suite first. you can use yarn build"
    exit 0
)

IF "%WALLET_DIST%"=="" ( 
    echo "ERROR: environment variable WALLET_DIST is not set"
    echo "Please set env variable WALLET_DIST to the path of the dist folder of the wallet"
    exit 0
)

IF NOT EXIST %WALLET_DIST% (
    echo "ERROR: $WALLET_DIST is not found"
    echo "Please set WALLET_DIST to an existing path. you may need to build camino-wallet first"
    exit 0
)

IF "%EXPLORER_DIST%"=="" ( 
    echo "ERROR: environment variable EXPLORER_DIST is not set"
    echo "Please set env variable EXPLORER_DIST to the path of the dist folder of the explorer"
    exit 0
)

IF NOT EXIST %EXPLORER_DIST% (
    echo "ERROR: $EXPLORER_DIST is not found"
    echo "Please set EXPLORER_DIST to an existing path. you may need to build camino-block-explorer first"
    exit 0
)

DEL %SUITE_DIST%wallet 
DEL %SUITE_DIST%explorer

xcopy %WALLET_DIST% %SUITE_DIST%wallet /E
xcopy %EXPLORER_DIST% %SUITE_DIST%explorer /E

echo "DONE"
exit 0

