
import { expect } from 'chai'

describe('Wallet Access Mnemonic', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', () => {
        cy.addKopernikusNetwork()
        cy.accessWallet('mnemonic')
    })
})