import { expect } from 'chai'
import { accessWallet, changeNetwork, addKopernikusNetwork } from '../utils/utils'

let transactionsBody= {
    "transactions": [
        {
            "id": "2k4d9Ljm6R5G9a27c22KKwB5V9VdkisqzWMkp68d9cTMVX5Br9",
            "chainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
            "type": "export",
            "inputs": [
                {
                    "output": {
                        "id": "3bRd24oK4GCaWNbJgRLwLEi3WgqbvRry5Qw3Wu4qwFkBHCejo",
                        "transactionID": "fq66KUVeA3jPh2XTNCrrJN6dYsA9EFFp1LtQEYHMi6Wrn73Gr",
                        "outputIndex": 0,
                        "assetID": "iTV3Gh5EY2aUqt6JyhKkHSH4thSsUUhGC8GhxwDrTxgmREpr1",
                        "stake": false,
                        "frozen": false,
                        "stakeableout": false,
                        "genesisutxo": false,
                        "outputType": 7,
                        "amount": "990990000000",
                        "locktime": 0,
                        "stakeLocktime": 0,
                        "threshold": 1,
                        "addresses": [
                            "kopernikus102uap4au55t22m797rr030wyrw0jlgw25ut8vj"
                        ],
                        "caddresses": null,
                        "timestamp": "2023-02-23T15:51:43Z",
                        "redeemingTransactionID": "2k4d9Ljm6R5G9a27c22KKwB5V9VdkisqzWMkp68d9cTMVX5Br9",
                        "chainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                        "inChainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                        "outChainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                        "groupID": 0,
                        "payload": "",
                        "block": "",
                        "nonce": 0,
                        "rewardUtxo": false
                    },
                    "credentials": [
                        {
                            "address": "kopernikus102uap4au55t22m797rr030wyrw0jlgw25ut8vj",
                            "public_key": "AjeagHTV7XNyhBxZEf8UChqPSTHcBYPbq46l6IkeUG6C",
                            "signature": "54feuCfa9drJNChsXibzJ4fWD9gHYknyIPfz81bkBzBxoK7lhVWh+fryoN7zvCqpTwjDaY1n3foLNAJ5SHAHhQA="
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "id": "2769qhxPXMzmSJD636Xwvd5KCQVCwBvKCnoqEPwVdSaXZctspj",
                    "transactionID": "2k4d9Ljm6R5G9a27c22KKwB5V9VdkisqzWMkp68d9cTMVX5Br9",
                    "outputIndex": 0,
                    "assetID": "iTV3Gh5EY2aUqt6JyhKkHSH4thSsUUhGC8GhxwDrTxgmREpr1",
                    "stake": false,
                    "frozen": false,
                    "stakeableout": false,
                    "genesisutxo": false,
                    "outputType": 7,
                    "amount": "988988000000",
                    "locktime": 0,
                    "stakeLocktime": 0,
                    "threshold": 1,
                    "addresses": [
                        "kopernikus102uap4au55t22m797rr030wyrw0jlgw25ut8vj"
                    ],
                    "caddresses": null,
                    "timestamp": "2023-02-23T15:55:29Z",
                    "redeemingTransactionID": "",
                    "chainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                    "inChainID": "",
                    "outChainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                    "groupID": 0,
                    "payload": "",
                    "block": "",
                    "nonce": 0,
                    "rewardUtxo": false
                },
                {
                    "id": "pbaL4yMjHMP48m1TgJDBjLpEWvFvrGedH7yWSWvWUsZqCpMtN",
                    "transactionID": "2k4d9Ljm6R5G9a27c22KKwB5V9VdkisqzWMkp68d9cTMVX5Br9",
                    "outputIndex": 1,
                    "assetID": "iTV3Gh5EY2aUqt6JyhKkHSH4thSsUUhGC8GhxwDrTxgmREpr1",
                    "stake": false,
                    "frozen": false,
                    "stakeableout": false,
                    "genesisutxo": false,
                    "outputType": 7,
                    "amount": "000000000",
                    "locktime": 0,
                    "stakeLocktime": 0,
                    "threshold": 1,
                    "addresses": [
                        "kopernikus102uap4au55t22m797rr030wyrw0jlgw25ut8vj"
                    ],
                    "caddresses": null,
                    "timestamp": "2023-02-23T15:55:29Z",
                    "redeemingTransactionID": "2sQVUHaUk4LTqrSwRjatSHFKBXRDB3ZKzPHA12MyqsrjjhQunQ",
                    "chainID": "11111111111111111111111111111111LpoYY",
                    "inChainID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq",
                    "outChainID": "11111111111111111111111111111111LpoYY",
                    "groupID": 0,
                    "payload": "",
                    "block": "",
                    "nonce": 0,
                    "rewardUtxo": false
                }
            ],
            "memo": "",
            "inputTotals": {
                "iTV3Gh5EY2aUqt6JyhKkHSH4thSsUUhGC8GhxwDrTxgmREpr1": "990990000000"
            },
            "outputTotals": {
                "iTV3Gh5EY2aUqt6JyhKkHSH4thSsUUhGC8GhxwDrTxgmREpr1": "990989000000"
            },
            "reusedAddressTotals": null,
            "timestamp": "2023-02-23T15:55:29Z",
            "txFee": 0,
            "genesis": false,
            "rewarded": false,
            "rewardedTime": null,
            "epoch": 0,
            "vertexId": "ZsubeJ9fQeeytdC6w9mJtPtgbr1QwSYYwPQDvHgNiZc22FiyB",
            "validatorNodeID": "",
            "validatorStart": 0,
            "validatorEnd": 0,
            "txBlockId": ""
        }
    ],
    "startTime": "0001-01-01T00:00:00Z",
    "endTime": "2023-02-23T19:37:03Z"
}

let txcount= {
    "aggregates": {
        "AggregateMerge": null,
        "startTime": "2023-02-28T04:44:40Z",
        "endTime": "2023-0-01T04:44:40Z",
        "transactionVolume": "",
        "transactionCount": 1,
        "addressCount": 0,
        "outputCount": 0,
        "assetCount": 0,
        "testCases" : 0,
    },
    "startTime": "2023-02-28T04:44:40Z",
    "endTime": "2024-02-28T23:59:59Z"
}

let txFee = {
    "aggregates": {
        "AggregateMerge": null,
        "startTime": "2023-02-28T12:20:31Z",
        "endTime": "2023-03-01T12:20:31Z",
        "txfee": 0
    },
    "startTime": "2023-02-28T12:20:31Z",
    "endTime": "2023-03-01T12:20:31Z"
}

let validators =  {
    "name": "GeoIPInfo",
    "value": [
        {
            "nodeID": "NodeID-6fPA2ZK4W8xE8zKuYYNS34nftFxp8UPQ8",
            "txID": "KbsVKunggkQWhX3rRYx8aWHvgB1muaCjq8LPsARvaMJ6AHbJB",
            "connected": true,
            "uptime": 0.905,
            "lng": 0,
            "lat": 0,
            "IP": "10.9.2.30",
            "startTime": "2023-02-23 13:14:23 +0000 UTC",
            "endTime": "2023-03-16 13:28:48 +0000 UTC",
            "duration": "21 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        },
        {
            "nodeID": "NodeID-6XD16eZ22fadTKq3qsxro9TPFZyxTiFv3",
            "txID": "28hjHTEeKm14sYwJzyaXGjxQ3CVfDPv8Unzs6o3WRwJGsbZcGt",
            "connected": true,
            "uptime": 1,
            "lng": 0,
            "lat": 0,
            "IP": "10.10.197.192",
            "startTime": "2022-12-15 00:00:00 +0000 UTC",
            "endTime": "2023-12-09 23:00:00 +0000 UTC",
            "duration": "359 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        },
        {
            "nodeID": "NodeID-6rsqgkg4F1i3SBjzj4tS5ucQWH7JMEouj",
            "txID": "gnymBKM4F44ygtTPF26WeTgpHTonLNgrDQJ7pDQsMdZpsjnkr",
            "connected": true,
            "uptime": 1,
            "lng": 0,
            "lat": 0,
            "IP": "10.9.4.26",
            "startTime": "2022-12-15 00:00:00 +0000 UTC",
            "endTime": "2024-12-03 22:00:00 +0000 UTC",
            "duration": "719 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        }
    ]
} 

describe('latest transaction list Xchainet', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {

        cy.intercept('GET', '**/v2/aggregates*', (req) => {
            req.reply({
                statusCode: 200,
                body: txcount
            })
        }).as('txcount')

        cy.intercept('POST', '**/v2/validatorsInfo', (req) => {
            req.reply({
                statusCode: 200,
                body: validators
            })
        }).as('ValidatorsInfo')

        
        cy.intercept('GET', '**/v2/transactions*', (req) => {
            req.reply({
                statusCode: 200,
                body: transactionsBody,
            })
        }).as('transactions')

        cy.intercept('GET', '**/v2/txfeeAggregates*', (req) => {
            req.reply({
                statusCode: 200,
                body: txFee,
            })
        }).as('txfee')
    })
    it('latest transaction list Xchain', () => {    
        addKopernikusNetwork(cy)
        cy.get('[data-cy="app-selector-menu"] > .MuiSelect-select').should('be.visible')
        cy.get('[data-cy="app-selector-menu"] > .MuiSelect-select').click()
        cy.get('[data-cy="app-selector-Explorer"] > .css-8atqhb > .MuiBox-root').should('be.visible')
        cy.get('[data-cy="app-selector-Explorer"] > .css-8atqhb > .MuiBox-root').click()
        cy.get('.MuiContainer-root > .MuiToolbar-root').should('be.visible')
        cy.get('#simple-tab-1').click()
        cy.wait('@ValidatorsInfo').then( ()=>{
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-h4').invoke("text")
        .then(textV => {
            var numberV =parseInt(textV)
            if(numberV == validators.value.length){
                cy.log('success validators number')
            }else{
                throw new Error("failed validators number")
            }
        })
        })
        cy.wait('@txcount').then(()=>{
            cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
            cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-root').invoke('text')
            .then(textCount =>{
                var txC =parseInt(textCount)
                if(txC == txcount.aggregates.transactionCount){
                    cy.log('success tx count')
                }else{
                    throw new Error("failed tx count")
                }
            })
        })
        cy.wait('@transactions').then(()=>{
            cy.get('.css-1voxykv-MuiPaper-root').should('be.visible')
            cy.get(':nth-child(1) > .MuiGrid-grid-md-4 > .MuiGrid-container > .MuiGrid-grid-xs-8 > a > .MuiTypography-root').invoke('text')
            .then(textId =>{
                if(textId == transactionsBody.transactions[0].id){
                    cy.log('success txId')
                }else{
                    throw new Error("failed tx id")
                }
            })
            cy.get('.MuiGrid-grid-xs-4 > .MuiChip-root > .MuiChip-label').invoke('text')
            .then(textType =>{
                if(textType == transactionsBody.transactions[0].type){
                    cy.log('success type')
                }else{
                    throw new Error("failed type")
                }
            })
            cy.get(':nth-child(1) > .MuiGrid-grid-md-8 > .MuiGrid-grid-lg-8 > :nth-child(1) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > .MuiGrid-container > .MuiGrid-grid-xl-7 > a > .MuiTypography-root').invoke('text')
            .then(textFrom =>{
                if(textFrom == transactionsBody.transactions[0].inputs[0].output.addresses){
                    cy.log('success address from')
                }else{
                    throw new Error("failed address from")
                }
            })
            cy.get(':nth-child(1) > .MuiGrid-grid-md-8 > .MuiGrid-grid-lg-8 > :nth-child(2) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > :nth-child(1) > .MuiGrid-grid-xl-7 > a > .MuiTypography-root').invoke('text')
            .then(textTo =>{
                if(textTo == transactionsBody.transactions[0].outputs[0].addresses){
                    cy.log('success adress to')
                }else{
                    throw new Error("failed address to")
                }
            })
            cy.get('[data-cy="cam-amount-From"]').invoke('text')
            .then(textIF =>{
                let numberFix =parseInt(transactionsBody.transactions[0].inputs[0].output.amount)/1000000000
                if(textIF == numberFix){
                    cy.log('success amount from')
                }else{
                    throw new Error("failed amount from")
                }
            })
            cy.get('[data-cy="cam-amount-To"]').invoke('text')
            .then(textIT =>{
                let numberFix =parseInt(transactionsBody.transactions[0].outputs[0].amount)/1000000000
                if(textIT == numberFix){
                    cy.log('succes amount to')
                }else{
                throw new Error("failed amount to")
                }
            })
            cy.get('[data-cy="cam-amount-Fees"]').invoke('text')
            .then(textFee =>{
                if(textFee == transactionsBody.transactions[0].txFee){
                    cy.log('succes tx fee')
                }else{
                throw new Error("failed tx fee")
                }
            })
        })
        cy.wait('@txfee').then(()=>{
            cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
            cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-root').invoke('text')
            .then(textF =>{
                var fee = parseInt(textF)
                if(fee == txFee.aggregates.txfee){
                    cy.log('success fee')
                }else{
                    throw new Error("failed fee")
                }
            })
        })
    })
})
