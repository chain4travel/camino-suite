import { expect } from 'chai'
import '@cypress/xpath';
import { changeNetwork, accessWallet } from '../utils/utils';

describe('Wallet Balance Mnemonic', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', () => {
        changeNetwork(cy);
        accessWallet(cy, true);   
    });
})