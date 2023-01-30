import { expect } from 'chai'
import '@cypress/xpath';
import { changeNetwork } from '../utils/network';

describe('Wallet Access Mnemonic', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', () => {
        changeNetwork(cy);
        cy.wait(2000);
        cy.get('.css-1gr9h7h > .MuiTypography-root').click();

        cy.get('.css-1u20msc > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click();

        cy.readFile(`cypress/temp/wallets/testWallet.json`).then((data) => {
            let phraseArr = data;
            for (let i = 0; i < phraseArr.length; i++) {
                let indexInput = i + 1;
                cy.get(`:nth-child(${indexInput}) > .phrase_word`).type(phraseArr[i])
            }
    
            cy.contains('Access Wallet').click({force: true});
            cy.get('.css-1ahpw46 > .MuiInputBase-root > .MuiSelect-select').click();
            cy.get('.MuiList-root > [tabindex="-1"]').click();
            
        })
    });
})