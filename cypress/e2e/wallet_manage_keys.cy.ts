import { expect } from 'chai'
import '@cypress/xpath'
import Web3 from 'web3'

const path: string = '/ext/bc/C/rpc'

describe('Wallet Creation', { tags: ['@wallet'] }, () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/create wallet', () => {
        cy.addKopernikusNetwork()
        cy.accessWallet('privateKey')

        cy.get('[data-cy="wallet_manage"]', { timeout: 30000 })
            .click()
            .then(() => {
                cy.get('[data-cy="manage-key-private-key-c"]', { timeout: 15000 }).click()
                cy.get('[data-cy="private-key-display"]')
                    .invoke('text')
                    .then(privateKey => {
                        let web3Validated: boolean = validateWeb3Account(privateKey)
                        if (web3Validated) {
                            cy.log('C Chain Private Key supported with web3')
                            cy.get('[data-cy="btn-modal-close"]', { timeout: 5000 }).click()

                            cy.get('[data-cy="manage-key-singleton"]', { timeout: 10000 }).should(
                                'be.visible',
                            )

                            cy.get('[data-cy="manage-key-singleton"]', { timeout: 10000 }).click()

                            cy.get('[data-cy="private-key-display"]', { timeout: 10000 }).should(
                                'be.visible',
                            )
                        } else {
                            throw new Error('C Chain Private Key is not supported with web3')
                        }
                    })
            })
    })
})

function validateWeb3Account(privateKey): boolean {
    try {
        let strUrlRpc: any = localStorage.getItem('network_selected')
        let strUrlRpcArr = strUrlRpc.split('"')
        const web3 = new Web3(`${strUrlRpcArr[1]}/${path}`)
        web3.eth.accounts.privateKeyToAccount(privateKey)
        return true
    } catch (e) {
        return false
    }
}

function getTextInputKeyPhrase(cyField: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cy.get(cyField)
            .invoke('text')
            .then((textPhrase: any) => {
                resolve(textPhrase)
            })
    })
}
