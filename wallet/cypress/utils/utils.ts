
export function changeNetwork(cy: Cypress.cy & CyEventEmitter, network = 'Columbus') {
    cy.get('[data-cy="network-selector"]').click(); //Network Switcher
    cy.get(`[data-cy="network-name-${network}"]`).click(); //Select Columbus Network
}

export function addLocalNetwork(cy: Cypress.cy & CyEventEmitter)
{
    const localNetworkName = "Localhost";

    cy.get('[data-cy="network-selector"]').click();
    cy.get('[data-cy="add-custom-network"]').click();

    cy.get('[data-cy="add-network-field-network-name"]').clear();
    cy.get('[data-cy="add-network-field-network-name"]').type(localNetworkName);

    cy.get('[data-cy="add-network-field-protocol"]').clear();
    cy.get('[data-cy="add-network-field-protocol"]').type("http");

    cy.get('[data-cy="add-network-field-host"]').clear();
    cy.get('[data-cy="add-network-field-host"]').type("localhost");

    cy.get('[data-cy="add-network-field-port"]').clear();
    cy.get('[data-cy="add-network-field-port"]').type("9650");

    cy.get('[data-cy="add-network-field-magellan-address"]').clear();
    cy.get('[data-cy="add-network-field-magellan-address"]').type("http://localhost:8080/v2/");
    cy.get('[data-cy="btn-add-network"]').click();

    cy.get(`[data-cy="network-name-${localNetworkName}"]`).click();
}

export async function accessWallet(cy: Cypress.cy & CyEventEmitter, type: string) {
    cy.get('[data-cy="app-selector-menu"]').click();
    cy.get('[data-cy="app-selector-Wallet"]').click();

    if (type === "mnemonic") {
        cy.get('[data-cy="btn-wallet-access-mnemonic"]').click();
        cy.readFile(`cypress/temp/wallets/mnemonic_wallet.json`).then((data) => {
            let phraseArr = data;
            for (let i = 0; i < phraseArr.length; i++) {
                let indexInput = i + 1;
                cy.get(`[data-cy="mnemonic-field-${indexInput}"]`).type(phraseArr[i]);
            }
            cy.get('[data-cy="btn-submit-mnemonic-phrase"]').click({force: true});
        });
    }
    if (type === "privateKey") {
        
        /*
        cy.get('#app > div > div.MuiBox-root.css-ymnp2l > div > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1)').click()
        cy.readFile('cypress/temp/wallets/private_key_wallet.json').then((privateKey) => {
            cy.get('#input-11').type(privateKey.privateKey)
        })
        cy.get('#app > div > div.MuiBox-root.css-ymnp2l > div > div > div > div > form > button').click()
        cy.get('#router_view > div.container.content > div.main_panel > div > div.header > h2');
        */
    }
}