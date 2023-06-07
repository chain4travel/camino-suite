// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { Interception } from 'cypress/types/net-stubbing'
import { getDisplayValueForGewi } from '../../src/utils/currency-utils'

// -- This is a parent command --
Cypress.Commands.add('addCustomNetwork', (networkConfig: NetworkConfig) => {
    const { networkName, rpcUrl, magellanUrl, explorerUrl } = networkConfig
    cy.get('[data-cy="network-selector"]').click()
    cy.get('[data-cy="add-custom-network"]').click()
    // Wait for re-rendering ??
    cy.wait(2000)
    cy.get('[data-cy="add-network-field-network-name"]', { timeout: 15000 })
        .find('input', { timeout: 12000 })
        .type(networkName)
    cy.get('[data-cy="add-network-field-url"]').type(rpcUrl)
    cy.get('[data-cy="add-network-field-magellan-address"]').type(magellanUrl || '')
    cy.get('[data-cy="btn-add-network"]').click()
    // Wait to connecting network
    cy.wait(5000)

    const itExists = Cypress.$(`[data-cy="network-name-${networkConfig.networkName}"]`).length

    if (itExists) {
        console.log('existe')
        cy.get(`[data-cy="network-name-${networkConfig.networkName}"]`).click()
    }

    // Click backdrop to close menu
})

Cypress.Commands.add('addCustomNetworkByName', (network: string) => {
    cy.fixture(`${network.toLowerCase()}/network`).then((networkConfig: NetworkConfig) => {
        if (networkConfig) {
            cy.addCustomNetwork(networkConfig)
        }
    })
})

Cypress.Commands.add('changeNetwork', (network: string = 'Kopernikus') => {
    const interceptNetworkInfo = intercept => {
        switch (intercept.request.body.method) {
            case 'info.getNetworkID':
                const networkID = intercept.response?.body.result.networkID
                // parsing rpc host
                const urlRegex = /^(https?:)\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/ // $1: protocol, $2: host, $3: port, $4: path + query string
                const urlParts = intercept.request.url.match(urlRegex) ?? []
                const host = urlParts[2]
                const port = urlParts[1].startsWith('https') ? 443 : 80
                const protocol = urlParts[1]
                cy.wrap({ protocol, host, port, networkID }).as('currentRpcHost')
                break
            case 'info.getTxFee':
                const txFee = intercept.response?.body.result.txFee
                cy.wrap(txFee).as('txFee')
                break
        }
    }

    // intercept to get default info
    cy.intercept('POST', '**/ext/info', request => {
        if (request.body.method === 'info.getNetworkID') {
            request.alias = 'getNetworkID'
        } else if (request.body.method === 'info.getTxFee') {
            request.alias = 'getTxFee'
        } else {
            console.log('Other Info Query')
        }
    })

    cy.get('@txtSelectedNetwork')
        .invoke('text')
        .then(currentNetwork => {
            cy.get('@btnNetworkSwitcher').click({ force: true }) // Network Switcher
            cy.get(`[data-value="${network}"]`).click() // Select Network

            // Waiting 'info.networkID', and 'info.getTxFee'
            cy.wait('@getNetworkID').then(interceptNetworkInfo)
            cy.wait('@getTxFee').then(interceptNetworkInfo)

            // increasing timeout to make sure the network is selected, especially on slowly local dev env
            cy.get('@txtSelectedNetwork', { timeout: 15000 }).should('have.text', network)
            // set context variable
            cy.wrap((network ?? currentNetwork).toLowerCase()).as('currentNetwork')
        })
})
Cypress.Commands.add('accessWallet', (type, keyName, networkName: string = 'kopernikus') => {
    cy.selectWalletApp()
    cy.wait(5000)
    cy.get('[data-cy="app-selector-menu"]').click()
    cy.get('[data-cy="app-selector-Wallet"]').click()

    if (type === 'mnemonic') {
        cy.get('[data-cy="btn-wallet-access-mnemonic"]').click()
        cy.readFile(`cypress/temp/wallets/mnemonic_wallet.json`).then(data => {
            let phraseArr = data
            for (let i = 0; i < phraseArr.length; i++) {
                let indexInput = i + 1
                cy.get(`[data-cy="mnemonic-field-${indexInput}"]`).type(phraseArr[i])
            }
            cy.get('[data-cy="btn-submit-mnemonic-phrase"]').click({ force: true })
        })
    }
    if (type === 'privateKey') {
        cy.get('[data-cy="btn-wallet-access-private-key"]', { timeout: 10000 }).click()
        cy.readFile('cypress/temp/wallets/private_key_wallet.json').then(privateKey => {
            const privateKeyCChain = privateKey.privateKey
            cy.get('[data-cy="field-private-key"]', { timeout: 10000 }).type(privateKeyCChain)
        })
        cy.get('[data-cy="btn-submit-private-key"]').click()
    }
    cy.get('[data-cy="btn-show-breakdown"]', { timeout: 20000 }).should('be.visible')
    // cy.intercept('GET', '**/api/v1/verified/*').as('apiVerifiedAddress')
    // cy.wait('@apiVerifiedAddress').then((intercept) => {
    //     console.log('verified address: ', intercept.request.url)
    //     const pathRegex = /^https?:\/\/[A-Za-z0-9\-\.]+\/api\/v1\/verified\/(.*)$/
    //     const matchGroup = intercept.request.url.match(pathRegex)
    //     cy.get('@elPreferenceMenu')
    //         .find(':nth-child(3) > [role="button"]', { timeout: 15000 })
    //         .should('have.text', matchGroup?.[1])
    // })
})
// Cypress.Commands.add('accessWallet', (type, keyName) => {
//     cy.get('@btnWallet').click()
//     cy.get('h6 + .MuiGrid-container').as('elWalletOptions')
//     cy.get('@elWalletOptions')
//         .find('> .MuiGrid-container:nth-child(1) > :nth-child(1)')
//         .as('elPrivateKeyOption')
//     cy.get('@elWalletOptions')
//         .find('> .MuiGrid-container:nth-child(1) > :nth-child(2)')
//         .as('elMnemonicOption')
//     switch (type) {
//         case 'privateKey':
//             {
//                 cy.get('@elPrivateKeyOption').click()
//                 cy.get('@currentNetwork').then((currentNetwork) => {
//                     cy.fixture(`${currentNetwork}/private_key_wallet`).then((privateKeys) => {
//                         cy.get('[data-cy="field-private-key"]').type(privateKeys[keyName || 'privateKey'])
//                     })
//                     cy.get('button[type="button"]').contains('Access Wallet').click()
//                 })
//             }
//             break
//         case 'mnemonic':
//             {
//                 cy.get('@elMnemonicOption').find('> .MuiButtonBase-root').click()
//                 cy.get('@currentNetwork').then((currentNetwork) => {
//                     cy.fixture(`${currentNetwork}/mnemonic_wallet`).then((phraseArr) => {
//                         const mnemonicStr = phraseArr.join(' ')
//                         cy.get('input.phrase_word').first()?.type(mnemonicStr)
//                         cy.get('button[type="button"]').contains('Access Wallet').click()
//                     })
//                 })
//             }
//             break
//         default:
//             break
//     }
// })

Cypress.Commands.add('switchToWalletApp', () => {
    cy.get('[data-cy="app-selector-menu"]').click()
    cy.get('[data-cy="app-selector-Wallet"]').click()
})

Cypress.Commands.add(
    'loginWalletWith',
    (walletAccessType: WalletAccessType, keyName?: string, network: string = 'Kopernikus') => {
        cy.visit('/')

        // Close cookie dialog
        cy.get('[aria-labelledby="cc-nb-title"] button.cc-nb-okagree').click()

        // header - app(left) menu aliases
        cy.get('[data-cy="app-selector-menu"]').as('elAppMenu')

        // header - preference(right) menu aliases
        cy.get('header > .MuiToolbar-root > .MuiBox-root:nth-child(2)').as('elPreferenceMenu')
        cy.get('@elPreferenceMenu')
            .find('.MuiInputBase-root > .MuiSelect-select', { timeout: 30000 })
            .as('btnNetworkSwitcher')
        cy.get('@btnNetworkSwitcher').find('.MuiTypography-root').as('txtSelectedNetwork')
        cy.get('@elPreferenceMenu').find('> .MuiBox-root').as('btnWallet')

        cy.switchToWalletApp()
        // Only add non-default networks
        if (network === 'Kopernikus') {
            cy.addCustomNetworkByName(network)
        }

        cy.changeNetwork(network)

        cy.wait(5000)

        switch (walletAccessType) {
            case 'privateKey':
                {
                    cy.get('[data-cy="btn-wallet-access-private-key"]').click()
                    cy.fixture(`${network.toLowerCase()}/private_key_wallet`).then(privateKeys => {
                        cy.get('[data-cy="field-private-key"]').type(
                            privateKeys[keyName || 'privateKey'],
                        )
                    })
                    cy.get('button[type="button"]').contains('Access Wallet').click()
                }
                break
            case 'mnemonic':
                {
                    cy.get('[data-cy="btn-wallet-access-mnemonic"]').click()
                    console.log(network)
                    cy.fixture(`${network.toLowerCase()}/mnemonic_wallet`).then(phraseArr => {
                        const mnemonicStr = phraseArr.join(' ')
                        cy.get('input.phrase_word').first()?.type(mnemonicStr)
                        cy.get('button[type="button"]').contains('Access Wallet').click()
                    })
                }
                break
            default:
                break
        }
        cy.get('[data-cy="btn-show-breakdown"]', { timeout: 20000 }).should('be.visible')
    },
)

Cypress.Commands.add('switchToWalletFunctionTab', func => {
    let funcKey
    switch (func) {
        case 'Portfolio':
            funcKey = ''
            break
        case 'Send':
            funcKey = 'wallet_transfer'
            break
        case 'Cross Chain':
            funcKey = 'wallet_export'
            break
        case 'Validator':
            funcKey = 'wallet_validator'
            break
        case 'Earn':
            funcKey = 'wallet_earn'
            break
        case 'Studio':
            funcKey = 'wallet_studio'
            break
        case 'Activity':
            funcKey = 'wallet_activity'
            break
        case 'Manage Keys':
            funcKey = 'wallet_manage'
            break
        case 'Advanced':
            funcKey = 'wallet_advanced'
            break
        default:
            throw new Error(`Unsupported wallet function ${func}`)
    }
    if (funcKey === '') {
        cy.get('.top-bar .wallet_link:first-child', { timeout: 15000 }).click()
    } else {
        cy.get(`[data-cy="${funcKey}"]`, { timeout: 15000 }).click()
    }
})

Cypress.Commands.add('entryExplorer', (network: string = 'Kopernikus') => {
    cy.visit('/')

    cy.fixture('mocks/txfee_aggregates.json').then(txfeeAggregates => {
        cy.intercept('GET', '**/v2/txfeeAggregates*', request => {
            request.reply({
                statusCode: 200,
                body: txfeeAggregates,
            })
        }).as('txfeeAggregates')
    })

    cy.fixture('mocks/tx_count_aggregates.json').then(aggregates => {
        cy.intercept('GET', '**/v2/aggregates*', request => {
            request.reply({
                statusCode: 200,
                body: aggregates,
            })
        }).as('aggregates')
    })

    cy.fixture('mocks/validators_info.json').then(validatorsInfo => {
        cy.intercept('POST', '**/v2/validatorsInfo', request => {
            request.reply({
                statusCode: 200,
                body: validatorsInfo,
            })
        }).as('validatorsInfo')
    })

    // Close cookie dialog
    cy.get('[aria-labelledby="cc-nb-title"] button.cc-nb-okagree').click()

    // header - app(left) menu aliases
    cy.get('[data-cy="app-selector-menu"]').as('elAppMenu')

    // header - preference(right) menu aliases
    cy.get('header > .MuiToolbar-root > .MuiBox-root:nth-child(2)').as('elPreferenceMenu')
    cy.get('@elPreferenceMenu')
        .find('.MuiInputBase-root > .MuiSelect-select', { timeout: 30000 })
        .as('btnNetworkSwitcher')
    cy.get('@btnNetworkSwitcher').find('.MuiTypography-root').as('txtSelectedNetwork')
    cy.get('@elPreferenceMenu').find('> .MuiBox-root').as('btnWallet')

    // Only add non-default networks
    if (network === 'Kopernikus') {
        cy.fixture(`${network.toLowerCase()}/network`).then((networkConfig: NetworkConfig) => {
            if (networkConfig) {
                cy.addCustomNetwork(networkConfig)
            }
        })
    }

    cy.changeNetwork(network)

    cy.get('@txtSelectedNetwork').should('have.text', network)

    cy.selectExplorerApp()

    cy.wait(6000)
})

Cypress.Commands.add('checkValidatorsTxsGasFee', () => {
    cy.contains('Number Of Validators').siblings('div').as('numberOfValidatorsBlock')
    cy.contains('Number of Transactions').siblings('div').as('numberOfTransactionsBlock')
    cy.contains('Total Gas Fees').siblings('div').as('totalGasFeesBlock')
    cy.wait('@aggregates')
        .then(intercept => {
            return intercept.response?.body.aggregates
        })
        .then(({ transactionCount }) => {
            cy.get('@numberOfTransactionsBlock').first().should('have.text', transactionCount)
        })

    cy.wait('@validatorsInfo')
        .then(intercept => {
            return intercept.response?.body.value
        })
        .then(validators => {
            // numberOfValidators
            const numberOfValidators = validators.length

            // numberOfActiveValidators
            const numberOfActiveValidators = validators.filter((v: any) => v.connected).length

            // numberOfActiveValidators
            const percentageOfActiveValidators = parseInt(
                ((numberOfActiveValidators / numberOfValidators) * 100).toFixed(0),
            )

            return {
                numberOfValidators,
                numberOfActiveValidators,
                percentageOfActiveValidators,
            }
        })
        .then(({ numberOfValidators, numberOfActiveValidators, percentageOfActiveValidators }) => {
            cy.get('@numberOfValidatorsBlock')
                .first()
                .should(
                    'have.text',
                    `${numberOfValidators}(${numberOfActiveValidators} / ${percentageOfActiveValidators}% active)`,
                )
        })

    cy.wait('@txfeeAggregates')
        .then(intercept => {
            return intercept.response?.body.aggregates
        })
        .then(({ txfee }) => {
            console.log(txfee)
            cy.get('@totalGasFeesBlock').first().should('have.text', getDisplayValueForGewi(txfee))
        })
})

Cypress.Commands.add('acceptCookies', () => {
    cy.get('.cc-nb-okagree').click()
})

Cypress.Commands.add('addKopernikusNetwork', () => {
    const configNetwork = {
        networkName: 'Kopernikus',
        urlAndPort: 'https://kopernikus.camino.network:443',
        magellandUrl: 'https://magellan.kopernikus.camino.network',
        sigavaultAddress: '',
    }

    cy.acceptCookies()
    cy.get('[data-cy="network-selector"]', { timeout: 12000 }).click()
    cy.get('[data-cy="add-custom-network"]', { timeout: 12000 }).click()
    cy.wait(10000)
    cy.get('[data-cy="add-network-field-network-name"]', { timeout: 12000 })
        .find('input', { timeout: 12000 })
        .type(`${configNetwork.networkName}`)
    cy.get('[data-cy="add-network-field-url"]', { timeout: 12000 })
        .find('input', { timeout: 12000 })
        .type(configNetwork.urlAndPort, { force: true })
    cy.get('[data-cy="add-network-field-magellan-address"]', { timeout: 12000 })
        .find('input', { timeout: 12000 })
        .type(configNetwork.magellandUrl, { force: true })
    cy.get('[data-cy="btn-add-network"]', { timeout: 20000 }).click()

    cy.get('div[role="presentation"]').then($elements => {
        let childrenFirstElement = $elements[0].classList
        let elementsChilds = Array.from(childrenFirstElement)
        if (elementsChilds.some(element => element === 'MuiMenu-root')) {
            cy.get(`[data-cy="network-name-${configNetwork.networkName}"]`).click()
        }
    })

    cy.wait(2000)
})

Cypress.Commands.add(
    'waitUntil',
    (alias: string, untilFunc: (intercept: Interception) => boolean) => {
        cy.wait(alias).then(intercept => {
            const success = untilFunc(intercept)
            if (!success) {
                cy.waitUntil(alias, untilFunc)
            }
        })
    },
)

Cypress.Commands.add(
    'getMockResponseData',
    (
        payloadMethod: string,
        requestUrl: string = '**/ext/bc/C/rpc',
        mockPath?: string,
        aliasName?: string,
    ) => {
        if (!mockPath) {
            const transferUnderLinePayloadMethod = payloadMethod
                .replace(/\B([A-Z])/g, '_$1')
                .replace('.', '_')
                .toLowerCase()
            mockPath = `mocks/${transferUnderLinePayloadMethod}.json`
        }
        if (!aliasName) {
            const getFileName = mockPath.replace('mocks/', '')
            aliasName = payloadMethod ? payloadMethod : getFileName.replace('.json', '')
        }
        cy.fixture(mockPath).then(mockData => {
            cy.intercept({ method: 'GET', url: requestUrl }, request => {
                if (!payloadMethod) {
                    request.reply({
                        statusCode: 200,
                        body: mockData,
                    })
                    request.alias = `get_${aliasName}`
                }
                if (
                    request.body.hasOwnProperty('method') &&
                    request.body.method.includes(payloadMethod)
                ) {
                    request.reply({
                        statusCode: 200,
                        body: mockData,
                    })
                    request.alias = `get_${aliasName}`
                }
            })

            cy.intercept({ method: 'POST', url: requestUrl }, request => {
                if (!payloadMethod) {
                    request.reply({
                        statusCode: 200,
                        body: mockData,
                    })
                    request.alias = `post_${aliasName}`
                }
                if (
                    request.body.hasOwnProperty('method') &&
                    request.body.method.includes(payloadMethod)
                ) {
                    request.reply({
                        statusCode: 200,
                        body: mockData,
                    })
                    request.alias = `post_${aliasName}`
                }
            })
        })
    },
)

Cypress.Commands.add('selectWalletApp', func => {
    cy.get('[data-cy="go-to-Wallet"]').click()
})

Cypress.Commands.add('selectExplorerApp', func => {
    cy.get('[data-cy="go-to-Explorer"]').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
