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
            '#router_view > div.container.content > div.wallet_main > div.top_cards.wallet_top > div.balance_card.top_card.balance_card > div.nft_col.nft_card > div > p'
        ).then((text) => {
            const oldBalance = text.text()
            cy.wrap(oldBalance).as('FirstBalance')
            cy.log(oldBalance)
        })
        cy.log('chao')
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > button'
        ).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > button.button_primary.v-btn.v-btn--block.v-btn--depressed.theme--light.v-size--default'
        ).click()
        cy.get(
            '#wallet_router > div > div.new_order_Form > div:nth-child(2) > div.checkout > label'
        ).contains('ID:')
        cy.intercept('https://magellan.columbus.camino.foundation/v2/transactions').as('getBalance')
        cy.intercept('https://columbus.camino.foundation/ext/bc/C/rpc').as('getRPC')
        cy.wait('@getBalance', {timeout: 5000})
        cy.wait('@getRPC', {timeout: 5000})
        cy.get(
            '#router_view > div.container.content > div.wallet_main > div.top_cards.wallet_top > div.balance_card.top_card.balance_card > div.nft_col.nft_card > div > p'
        ).then((text) => {
            const newBalance = text.text()
            cy.wrap(newBalance).as('SecondBalance')
            cy.log(newBalance)
        })
    })
    it('change balance', function() {
        cy.log(this.SecondBalance)
        cy.log(this.FirstBalance)
        expect(this.SecondBalance).to.not.eq(this.FirstBalance)
    })
})
