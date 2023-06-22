import { expect } from 'chai'

describe('Wallet Access Mnemonic', { tags: ['@wallet', '@suite'] }, () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', () => {
        cy.addKopernikusNetwork()
        cy.accessWallet('mnemonic')
    })
})
