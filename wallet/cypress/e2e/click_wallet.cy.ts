import { expect } from 'chai'
import '@cypress/xpath';

describe('Wallet Click', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/charge wallet', () => {
        cy.get('.css-1gr9h7h > .MuiTypography-root').click(); //Button Wallet
        cy.get('.css-1u20msc > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root > .MuiTypography-root').click(); //Mnemonic Wallet

        let phrase = "parent hour book sentence issue march ocean desert harsh food river orient magnet mixed engage chicken burger street tornado little shrug gossip pilot floor";

        let phraseArr = phrase.split(" ");

        for(let i = 0; i < phraseArr.length;i++)
        {

            
        }

    });


    ////*[@id="app"]/div/header/div/div[2]/div[2]
    
    //X Path

})
