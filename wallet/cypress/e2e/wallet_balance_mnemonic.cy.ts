import { expect } from 'chai'
import '@cypress/xpath';
import { changeNetwork, accessWallet } from '../utils/utils';

describe('Wallet Balance Mnemonic', () => {
    before(() => {
        cy.visit('/')
    });

    it('open suite/open wallet using mnemonic', () => {
        changeNetwork(cy);
        accessWallet(cy, "mnemonic");
    });

    after(async () => {

        await interceptXChainBalance();
        cy.get('.header > :nth-child(3) > .v-icon').click();
        await validateAllBalances();
    });
});


async function interceptXChainBalance() {
    cy.intercept('POST', 'https://columbus.camino.foundation/ext/bc/X', (req) => {

        //Interceptor in X Chain
        if (req.body.method == "avm.getUTXOs") {
            req.reply({
                statusCode: 200,
                body: {
                    "jsonrpc": "2.0",
                    "result": {
                        "numFetched": "2",
                        "utxos": [
                            "0x0000a5c08e35b04842fc5fce925ce09cc9f23023d9f2201447f8c71b9e199884a7eb0000000068c1c17ef684ee4260d1c7ab95fe5222dfd7fa60f3363051dae558072101df9b0000000700000005d21dba0000000000000000000000000100000001fa04f66120aa872cb36b6a43eb3e8aecec46c7d45148a7dd",
                            "0x0000c118dce645c6004f9562fb6c3b562fda234445c5c961903284b386e4f41923b20000000068c1c17ef684ee4260d1c7ab95fe5222dfd7fa60f3363051dae558072101df9b0000000700000005d21dba0000000000000000000000000100000001fa04f66120aa872cb36b6a43eb3e8aecec46c7d4a577830c"
                        ],
                        "endIndex": {
                            "address": "X-columbus1lgz0vcfq42rjevmtdfp7k052ankyd375puqjpl",
                            "utxo": "p85phsWY6DpHUnQE4TnGvuJ7LXPPvAv9YmENgWqB5YMfpver4"
                        },
                        "encoding": "hex"
                    },
                    "id": 40
                }
            });
        }
        else {
            console.log("Other query in X Chain");
        }
    });
}


async function validateAllBalances() {
    cy.wait(10000);
    let xFunds: number = await getBalanceText("X");
    let cFunds: number = await getBalanceText("C");
    let pFunds: number = await getBalanceText("P");

    let totalFunds: number = await getTotalBalanceText();

    console.log("fundsData", {
        xFunds: xFunds,
        cFunds: cFunds,
        pFunds: pFunds,
        totalFunds: totalFunds
    });

    let comparativeFunds = xFunds + cFunds + pFunds;

    console.log("totalFunds", {
        totalFundSum: comparativeFunds.toFixed(9),
        totalFundsHTML: totalFunds.toFixed(9)
    });

    if (totalFunds.toFixed(9) != comparativeFunds.toFixed(9)) {
        throw new Error("Funds it's not equals");
    }
}

function getTotalBalanceText(): Promise<number> {
    return new Promise((resolve, reject) => {
        let balanceNumber = "0";
        let balanceDecimals = ".0";
        let balanceTotal = "0";
        cy.get('[data-cy="wallet_balance"] > span').invoke("text").then((data) => {
            balanceNumber = data.toString();
            cy.get('.smaller').invoke("text").then((decimals) => {
                balanceDecimals = decimals;
                balanceTotal = balanceNumber + balanceDecimals;
                resolve(parseFloat(balanceTotal));
            });
        });
    });
}

function getBalanceText(chain: string): Promise<number> {
    return new Promise((resolve, reject) => {
        let attributeFind = "";
        switch (chain) {
            case "X":
                attributeFind = '.alt_breakdown > :nth-child(1) > :nth-child(2)';
                break;
            case "C":
                attributeFind = '.alt_breakdown > :nth-child(1) > :nth-child(4)';
                break;
            case "P":
                attributeFind = '.alt_breakdown > :nth-child(1) > :nth-child(6)';
                break;
            default:
                return 0;
        }
        cy.get(attributeFind).invoke('text').then((response) => {
            let fundsSplitted = response.split(" ");
            let funds = parseFloat(fundsSplitted[0]);
            resolve(funds);
        });
    });
}