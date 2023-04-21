
import { expect } from 'chai'

describe('Wallet Access Mnemonic', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', {tags:'@wallet'}, () => {
        cy.addKopernikusNetwork()
        cy.accessWallet('mnemonic')
    })
})