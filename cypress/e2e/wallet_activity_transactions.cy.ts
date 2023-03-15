import { expect } from 'chai'
import { changeNetwork, accessWallet, addKopernikusNetwork } from '../utils/utils'
import moment from 'moment'
import '@cypress/xpath'

let addressFrom = ''
const NETWORK_SWITCHER_BUTTON = '[data-cy="network-switcher"]'
let dataBody = {
    transactions: [
        {
            id: 'EBNhsdSkjzjW5jDKbDrix83ab4F1aTW3attRuM4Afv1FSKXa5',
            chainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
            type: 'base',
            inputs: [
                {
                    output: {
                        id: 'B5NHjtPuQ1xRbVDvQtdZLCnabN6muptkkqaC3FmomrbJzDXRN',
                        transactionID: 'BKFLodQvoF7aL2oZHQdwqARJ9Pv6YjFK4zjWixxjiJhfndyNK',
                        outputIndex: 1,
                        assetID: '2Q4U5CR7YVtkm12CrTjg4kcfZvu2ckET34VrxbZeEz7183yXW9',
                        stake: false,
                        frozen: false,
                        stakeableout: false,
                        genesisutxo: false,
                        outputType: 7,
                        amount: '988989811991894750',
                        locktime: 0,
                        stakeLocktime: 0,
                        threshold: 1,
                        addresses: ['kopernikus1g65uqn6t77p656w64023nh8nd9updzmxh8ttv3'],
                        caddresses: null,
                        timestamp: '2023-02-01T21:39:05Z',
                        redeemingTransactionID: 'EBNhsdSkjzjW5jDKbDrix83ab4F1aTW3attRuM4Afv1FSKXa5',
                        chainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                        inChainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                        outChainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                        groupID: 0,
                        payload: '',
                        block: '',
                        nonce: 0,
                        rewardUtxo: false,
                    },
                    credentials: [
                        {
                            address: 'kopernikus1g65uqn6t77p656w64023nh8nd9updzmxh8ttv3',
                            public_key: 'AtViX1NBqCTfY88owlAuDUvTSX+frSGcAslKhxX1G6fs',
                            signature:
                                's0MgM3Zc9PxY2ZMnLumHb4EaT6Xfmab9MNnRlL0ST29jPtzldom7I8VR5jnBDkkJHjLUpWlBqNyaXemGsdFeqAA=',
                        },
                    ],
                },
            ],
            outputs: [
                {
                    id: 'kAY1gHrHayDmm6i6eEmhDVtGbLudpZUxs5DiSmkqxiN8L65kM',
                    transactionID: 'EBNhsdSkjzjW5jDKbDrix83ab4F1aTW3attRuM4Afv1FSKXa5',
                    outputIndex: 0,
                    assetID: '2Q4U5CR7YVtkm12CrTjg4kcfZvu2ckET34VrxbZeEz7183yXW9',
                    stake: false,
                    frozen: false,
                    stakeableout: false,
                    genesisutxo: false,
                    outputType: 7,
                    amount: '15000000000',
                    locktime: 0,
                    stakeLocktime: 0,
                    threshold: 1,
                    addresses: ['kopernikus1ndnwhf6q6awh8fwv2q2czjg4ykwtnczgkdyak8'],
                    caddresses: null,
                    timestamp: `${moment().format('YYYY-MM-DD')}T21:41:31Z`,
                    redeemingTransactionID: '',
                    chainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                    inChainID: '',
                    outChainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                    groupID: 0,
                    payload: '',
                    block: '',
                    nonce: 0,
                    rewardUtxo: false,
                },
                {
                    id: '2ndn17w2fRodXufNiRLheSJqpV2zbWxhZ8etbQrxuoeicQ2y7E',
                    transactionID: 'EBNhsdSkjzjW5jDKbDrix83ab4F1aTW3attRuM4Afv1FSKXa5',
                    outputIndex: 1,
                    assetID: '2Q4U5CR7YVtkm12CrTjg4kcfZvu2ckET34VrxbZeEz7183yXW9',
                    stake: false,
                    frozen: false,
                    stakeableout: false,
                    genesisutxo: false,
                    outputType: 7,
                    amount: '988989796990894750',
                    locktime: 0,
                    stakeLocktime: 0,
                    threshold: 1,
                    addresses: ['kopernikus1g65uqn6t77p656w64023nh8nd9updzmxh8ttv3'],
                    caddresses: null,
                    timestamp: `${moment().format('YYYY-MM-DD')}T21:41:31Z`,
                    redeemingTransactionID: '',
                    chainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                    inChainID: '',
                    outChainID: '2mvrUCxfWijcFkj64Swh3eMdpefqs9MgFBddjBFbQ2Abtfugtn',
                    groupID: 0,
                    payload: '',
                    block: '',
                    nonce: 0,
                    rewardUtxo: false,
                },
            ],
            memo: 'VGVzdA==',
            inputTotals: {
                '2Q4U5CR7YVtkm12CrTjg4kcfZvu2ckET34VrxbZeEz7183yXW9': '988989811991894750',
            },
            outputTotals: {
                '2Q4U5CR7YVtkm12CrTjg4kcfZvu2ckET34VrxbZeEz7183yXW9': '988989811990894750',
            },
            reusedAddressTotals: null,
            timestamp: `${moment().format('YYYY-MM-DD')}T21:41:31Z`,
            txFee: 1000000,
            genesis: false,
            rewarded: false,
            rewardedTime: null,
            epoch: 0,
            vertexId: '2CDhTMVBKfHQkGCd99dRAGaFG9S2GsfsXFGEW5tWQgNybbMzjo',
            validatorNodeID: '',
            validatorStart: 0,
            validatorEnd: 0,
            txBlockId: '',
        },
    ],
    startTime: '0001-01-01T00:00:00Z',
    endTime: `${moment().format('YYYY-MM-DD')}T23:59:59Z`,
}
describe('activity transactions', () => {
    before(() => {
        cy.visit('/')
    })

    it('access activity transactions', () => {
        
        addKopernikusNetwork(cy);
        //changeNetwork(cy);

        let address = [
            "prison",
            "assist",
            "dress",
            "stay",
            "target",
            "same",
            "brown",
            "rally",
            "remove",
            "spice",
            "abstract",
            "liberty",
            "valley",
            "program",
            "wealth",
            "vacuum",
            "claw",
            "cat",
            "april",
            "relief",
            "choice",
            "voyage",
            "toddler",
            "forum"
        ];
        
        accessWallet(cy, 'mnemonic')

        cy.wait(10000)
        cy.get('[data-cy="wallet_activity"]', { timeout: 20000 })
        cy.get('[data-cy="wallet_activity"]').click()

        cy.intercept('POST', '**/v2/transactions', (req) => {
            if (req.body.chainID[0] == '11111111111111111111111111111111LpoYY') {
                req.reply({
                    statusCode: 200,
                    body: {
                        transactions: null,
                        startTime: '0001-01-01T00:00:00Z',
                        endTime: '2023-02-07T16:02:18Z',
                    },
                })
            } else {
                req.reply({
                    statusCode: 200,
                    body: dataBody,
                })
            }
        })

        cy.get('[data-cy="tx-table-activity"]', { timeout: 7000 }).should('be.visible')
        cy.get('.tx_cols', { timeout: 7000 }).should('be.visible')

        cy.get('[data-cy="tx-detail-0"] > .infoTx > .utxos > :nth-child(1) > .tx_out > .addresses > p')
            .invoke('text')
            .then((textAddress) => {
                addressFrom = textAddress.replace('from ', '')
                cy.log(addressFrom)
            })

        cy.log('Table Ok')
        cy.get('.meta_col > div > .time', { timeout: 7000 })
            .invoke('text')
            .then((text) => {
                cy.log('Continue Process')

                let splittedDate = text.split(' ')
                let dateMap = splittedDate.map((text) => text.trim())
                let strDateArr = dateMap.filter((text) => text)
                var textDate = strDateArr.slice(1, 7)
                let arrStrTextDate = textDate.toString().split(',')
                let aHourFormat = arrStrTextDate[4].split('.')
                let hourMorningOrAfternoon = `${aHourFormat[0]}${aHourFormat[1].replace(' ', '')}`
                let str4lformatDate = `${arrStrTextDate[1]}/${arrStrTextDate[0]}/${arrStrTextDate[2]} ${arrStrTextDate[3]} ${hourMorningOrAfternoon}`
                let dateUTC = moment(str4lformatDate, 'DD/MMM/YYYY hh:mm:ss a').toISOString()
                cy.get('[data-cy="tx-detail-0"] > .infoTx > .utxos > :nth-child(1) > .tx_out > .amount')
                    .should('be.visible')
                    .invoke('text')
                    .then((textAmount) => {
                        let textAmountArr = textAmount
                            .split(' ')
                            .filter(
                                (textData) =>
                                    textData != '\n' && textData != '' && textData != 'CAM\n'
                            )
                        let amount = parseInt(textAmountArr[0].replace('\n', '')) * 1000000000

                        if (
                            dateUTC.replace('.000', '') ==
                                dataBody.transactions[0].outputs[1].timestamp ||
                            amount == parseInt(dataBody.transactions[0].outputs[1].amount)
                            || addressFrom == dataBody[0].inputs[0].output.addresses[0]
                        ) {
                            cy.log('success')
                        } else {
                            cy.log('failed')
                        }
                    })
            })
    })
})