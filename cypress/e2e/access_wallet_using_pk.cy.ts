import { expect } from 'chai'
import { accessWallet, changeNetwork, addKopernikusNetwork } from '../utils/utils'

describe('access wallet', () => {
    before(() => {
        cy.visit('/')
    })
    it('Wallet access private key ', () => {
        //changeNetwork(cy);
        addKopernikusNetwork(cy)
        accessWallet(cy, 'privateKey')
        cy.get('.router-link-exact-active', {timeout:20000}).should('be.visible')
    })
})
