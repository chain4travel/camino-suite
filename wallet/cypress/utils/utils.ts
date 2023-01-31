
export function changeNetwork(cy: any) {
    cy.get('.css-1nt3z7i > .MuiInputBase-root > .MuiSelect-select').click(); //Network Switcher
    cy.get('[data-value="Columbus"] > .MuiTypography-root').click(); //Select Columbus Network
}

export function accessWallet(cy: any, mnemonic: boolean) {
    cy.wait(2000);
    cy.get('.css-1gr9h7h > .MuiTypography-root').click();

    cy.get('.css-1u20msc > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click();

    cy.readFile(`cypress/temp/wallets/mnemonic_wallet.json`).then((data) => {
        let phraseArr = data;
        for (let i = 0; i < phraseArr.length; i++) {
            let indexInput = i + 1;
            cy.get(`:nth-child(${indexInput}) > .phrase_word`).type(phraseArr[i])
        }

        cy.contains('Access Wallet').click({ force: true });
        cy.get('.css-1ahpw46 > .MuiInputBase-root > .MuiSelect-select').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
    });
}