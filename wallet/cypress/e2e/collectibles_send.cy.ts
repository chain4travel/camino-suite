import { expect } from 'chai'
import { accessWallet, changeNetwork } from '../utils/utils'

describe('access wallet', () => {
    before(() => {
        cy.visit('/')
    })
    it('Wallet access private key ', () => {
        changeNetwork(cy);
        accessWallet(cy, "privateKey");   
    })
})
