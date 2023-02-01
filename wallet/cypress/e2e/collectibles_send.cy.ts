import { expect } from 'chai'
import { accessWallet, changeNetwork } from '../utils/utils'

describe('access wallet', () => {
    before(() => {
        cy.visit('/')
    })
    it('Wallet access private key ', () => {
        changeNetwork(cy)
        accessWallet(cy, 'mnemonic')
        cy.get('#router_view > div.top-bar > div > div > a:nth-child(2)', {
            timeout: 10000,
        }).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div.lists > div:nth-child(2) > div:nth-child(2) > div > div > button'
        ).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div.lists > div:nth-child(2) > div:nth-child(2) > div.modal_main > div.modal_container > div > div.nft_sel_body > div > div:nth-child(1) > div > div'
        ).click()
        cy.readFile('cypress/temp/wallets/wallets_address.json').then((address) => {
            cy.get(
                '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.to_address > div > input'
            ).type(address.sendWallet)
        })
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > button'
        ).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > button.button_primary.v-btn.v-btn--block.v-btn--depressed.theme--light.v-size--default'
        ).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > label'
        ).contains('ID:')
    })
})
