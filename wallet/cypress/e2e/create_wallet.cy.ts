import { expect } from 'chai'
import '@cypress/xpath';
import { changeNetwork } from '../utils/network';

describe('Wallet Click', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/charge wallet', () => {
        changeNetwork(cy);
        cy.wait(2000);
        cy.get('.css-1gr9h7h > .MuiTypography-root').click();

        cy.get('[href="/create"] > .MuiButtonBase-root').click();

        cy.get('.ava_button').click();

        savePhrase().then((wordsPhrase: string[]) => {
            cy.get('.v-input--selection-controls__ripple').click();
            cy.contains('Access Wallet').click({force: true});

            for(let i = 0; i < wordsPhrase.length; i++)
            {
                let indexInput = i + 1;
                cy.get(`.words > :nth-child(${indexInput.toString()}) > input`).invoke('val').then((val) => {

                    if(val == wordsPhrase[i])
                    {
                        console.log(val)
                    }
                    else
                    {
                        cy.get(`.words > :nth-child(${indexInput.toString()}) > input`).type(wordsPhrase[i]);
                        console.log("Writed Word -> ", wordsPhrase[i]);
                    }
                })
            }

            cy.get('.mnemonic_body > .but_primary').click();
            cy.wait(2000);
            cy.contains('Access Wallet').click({force: true});


            cy.get('.css-1ahpw46 > .MuiInputBase-root > .MuiSelect-select').click();
            cy.get('.MuiList-root > [tabindex="-1"]').click();
        });

    });
})

function savePhrase ()  : Promise<string[]> {
    return new Promise((resolve, reject) => {
        cy.get('.phrase_raw').invoke('text').then((text) => {
            let phraseArr : string[] = text.split(" ").filter((data) => data != "" && data != "\n");
            phraseArr[23] = phraseArr[23].split("\n")[0];
            resolve(phraseArr);
        });
    })
}