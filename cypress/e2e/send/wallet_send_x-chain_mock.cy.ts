import { BigNumber } from 'bignumber.js'
import { BN, bnToBigAvaxX } from '@c4tplatform/camino-wallet-sdk/dist'

describe('Send transaction with x-chain balance',{ tags: ['@wallet', '@suite'] }, () => {
    beforeEach(() => {

        // access wallet with private key
        cy.loginWalletWith('privateKey')

        // mock avm.**
        cy.intercept('POST', '**/ext/bc/X', (request) => {
            if (request.body.method == 'avm.getUTXOs') {
                request.reply({
                    statusCode: 200,
                    fixture: 'mocks/avm_getUTXOs.json'
                })
            } else if (request.body.method === 'avm.issueTx') {
                request.reply({
                    statusCode: 200,
                    fixture: 'mocks/avm_issue_tx.json'
                })
                request.alias = 'issueTx'
            } else if (request.body.method === 'avm.getTxStatus') {
                request.reply({
                    statusCode: 200,
                    fixture: 'mocks/avm_get_tx_status.json'
                })
                request.alias = 'getTxStatus'
            }
        })

        // click Send tab
        cy.get('[data-cy="wallet_transfer"]').click()

        cy.get('.lists > div:nth-child(1) > .chain_select').contains('X').as('btnSourceX')

        cy.get('div.header > button:nth-child(3)').as('btnBreakdown')

        cy.get('div.alt_info > div > div:nth-child(1) > p:nth-child(2)').as('textXAvailBalance')

        cy.get('div.max_in_cont.hover_border > div > input').as('inputAmount')

        cy.get('div > div.col_balance > p').as('textMaxBalance')

        cy.get('div.bottom_tabs > div > button:nth-child(1)').as('btnXChain')

        cy.get('div.bottom > div.bottom_rest > p.addr_text').as('textAddress')

        cy.get('[data-cy="wallet_address"]').as('textWalletAddress')

        cy.get('div.new_order_Form > div:nth-child(2) > div.to_address > div > input').as(
            'inputToAddress'
        )

        cy.get('div.new_order_Form > div:nth-child(2) > div.checkout > button').as('btnConfirm')

        cy.get('div.checkout > button:eq(0)').as('btnSend')

        // cy.intercept('POST', '**/ext/bc/X').as('xEndpoints')

    })

    it.skip('Send transaction with all available x-chain balance', () => {

        // click Source Chain X
        cy.get('@btnSourceX').click()

        // click Show Breakdown
        cy.get('@btnBreakdown').click()

        // get x-chain balance and assert input amount
        cy.get('@textXAvailBalance')
            .invoke('text')
            .then((text) => {
                const xAvailBalanceText = text.replace(/[cam\s]/gi, '')
                expect(Number(xAvailBalanceText)).to.be.greaterThan(0)

                // type amount: xAvailBalanceText
                cy.get('@inputAmount').type(xAvailBalanceText)

                // expect input total x-chain amount changed as displayed max amount
                cy.get('@textMaxBalance')
                    .click()
                    .invoke('text')
                    .then((text) => {
                        const maxBalanceText = text.replace(/[balance:\s]/gi, '')
                        cy.get('@inputAmount').should('have.value', maxBalanceText)
                    })

                // expect input amount changed to (x-chain Available balance - Transaction Fee)
                cy.get('@inputAmount')
                    .invoke('val')
                    .then((val) => {
                        cy.get<String>('@txFee').then((txFee) => {
                            const xTxFee = bnToBigAvaxX(new BN(txFee)) // ???
                            const xAvailBalance = new BigNumber(Number(xAvailBalanceText))
                            const expectAmount = xAvailBalance.minus(xTxFee)
                            expect(val).to.equal(expectAmount.toString())
                        })
                    })

                // click x-chain address
                cy.get('@btnXChain').click()

                // get x-chain address and input ToAddress
                cy.get('@textWalletAddress')
                    .invoke('text')
                    .then((text) => {
                        const xAddressText = text.replace(/[\s]/gi, '')
                        cy.get('@inputToAddress').type(xAddressText)
                    })

                // click confirm button
                cy.get('@btnConfirm').click()
                // click send button
                cy.get('@btnSend').click()

                // expect display txID
                cy.wait('@issueTx').then(() => {
                    cy.get('div.new_order_Form > div:nth-child(2) > div.checkout > p').should(($p) => {
                        expect($p.first()).to.contain('Transaction Sent')
                    })
                })
            })
    }) // end it
}) // end describe

