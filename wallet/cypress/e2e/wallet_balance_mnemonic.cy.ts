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
        cy.get('.header > :nth-child(3) > .v-icon').click();
        await validateAllBalances();
    });
});


async function validateAllBalances() {
    cy.wait(10000);
    let xFunds : number = await getBalanceText("X");
    let cFunds : number = await getBalanceText("C");
    let pFunds : number = await getBalanceText("P");

    let totalFunds : number = await getTotalBalanceText();

    console.log("fundsData", {
        xFunds: xFunds,
        cFunds: cFunds,
        pFunds: pFunds,
        totalFunds: totalFunds
    });

    let comparativeFunds = xFunds + cFunds + pFunds;

    console.log("totalFunds",{
        totalFundSum : comparativeFunds.toFixed(9),
        totalFundsHTML: totalFunds.toFixed(9)
    });

    if(totalFunds.toFixed(9) != comparativeFunds.toFixed(9))
    {
        throw new Error("Funds it's not equals");
    }
}

function getTotalBalanceText() : Promise<number> {
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

function getBalanceText(chain: string) : Promise<number> {
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