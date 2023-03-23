import { expect } from 'chai'

describe('access wallet', () => {
    before(() => {
        cy.visit('/')
    })
    it('Wallet access private key ', () => {
        cy.addKopernikusNetwork()
        cy.accessWallet('privateKey')
        cy.get('.router-link-exact-active', {timeout:20000}).should('be.visible')
    })
})
