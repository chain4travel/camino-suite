import { expect } from 'chai'
import { accessWallet, changeNetwork } from '../utils/utils'

describe('access wallet', () => {
    before(() => {
        cy.visit('/')
    })
    it('Select the upper left drop-down menu Explorer', () => {
        changeNetwork(cy);
        accessWallet(cy, "privateKey");
       
    })
})
