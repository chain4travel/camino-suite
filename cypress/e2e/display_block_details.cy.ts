import { addKopernikusNetwork } from '../utils/utils'
// import dataBody from '../fixtures/block_data/data.json'

describe('Display block details', () => {
    before(() => {
        cy.visit('/')
    })

    it('display block details', () => {
        addKopernikusNetwork(cy)
        cy.intercept('GET', '**/v2/ctxdata/**', req => {
            console.log(dataBody)
            req.reply({
                statusCode: 200,
                body: dataBody,
            })
        }).as('getAddressChains')

        cy.get(':nth-child(2) > .MuiGrid-grid-lg-2 > a > .MuiTypography-root').click()

        cy.get('[data-cy="Block"]')
            .invoke('text')
            .then((blockId: any) => {
                expect(blockId).equal(dataBody.hash)
                cy.log(blockId).as('blockId')
            })
        cy.get('[data-cy="Gas Used"]')
            .invoke('text')
            .then(usedGas => {
                expect(parseInt(usedGas.replace(/\s+/g, ''))).equal(
                    dataBody.transactions[0].receipt.gasUsed,
                )
                cy.log('3 ' + usedGas).as('usedGas')
            })
        cy.get('[data-cy="Transaction Count"]')
            .invoke('text')
            .then(transactionCount => {
                expect(parseInt(transactionCount)).equal(dataBody.transactions[0].receipt.status)
                cy.log(transactionCount).as('transactionCount')
            })
        cy.get('[data-cy="transaction-hash"]')
            .invoke('text')
            .then(blockTransaction => {
                expect(blockTransaction).equal(dataBody.transactions[0].hash)
                cy.log(blockTransaction).as('blockTransaction')
            })
        cy.get('[data-cy="transaction-from"]')
            .invoke('text')
            .then(blockTransactionFrom => {
                expect(blockTransactionFrom).equal(dataBody.transactions[0].fromAddr)
                cy.log(blockTransactionFrom).as('blockTransactionFrom')
            })
        cy.get('[data-cy="transaction-to"]')
            .invoke('text')
            .then(blockTransactionTo => {
                expect(blockTransactionTo).equal(dataBody.transactions[0].toAddr)
                cy.log(blockTransactionTo).as('blockTransactionTo')
            })
    })
})
let dataBody = {
    hash: '0xab79c5b1c3518544e64b161d156527966defb95b098f5469eda67d91f5e1dc7b',
    header: {
        parentHash: '0x3b3d0eec1cef9e166293d23cf8dea269a91b97a6eca89ffadf327cf278a1c051',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        miner: '0x0100000000000000000000000000000000000000',
        stateRoot: '0x22b2f277b6eff1a4fadd1f7f8121f855c2e26310d0919d2a2256b7f34b42edd5',
        transactionsRoot: '0x290857732756c0646199803b9bc1c8558c0edd03b67075306aad4df1052f026c',
        receiptsRoot: '0xd0d072f45989f089f8c5584307856cafa101387c33f05d64c8742c12c51165b6',
        logsBloom:
            '0x00000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000001000001000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000001000010000000000000000000',
        difficulty: '0x1',
        number: '0x12',
        gasLimit: '0x7a1200',
        gasUsed: '0xd090',
        timestamp: '0x63fca0de',
        extraData: '0x',
        mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        extDataHash: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        baseFeePerGas: '0x2e90edd000',
        extDataGasUsed: '0x0',
        blockGasCost: '0x0',
        extraStateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        hash: '0xab79c5b1c3518544e64b161d156527966defb95b098f5469eda67d91f5e1dc7b',
    },
    transactions: [
        {
            type: 0,
            block: '18',
            hash: '0xfd8d1501d36132eee50372292a94514f79a488c4266fd589cefeccc895b450eb',
            createdAt: '2023-02-27T12:23:58Z',
            nonce: 2,
            gasPrice: '200000000000',
            gasLimit: 53775,
            value: '0',
            input: '0x9a11b2e8000000000000000000000000cb09fb9dbd7e956eb4efd0ca37f02847b97aac0d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
            fromAddr: '0x6307fbbc2b7505d1d713fb71e9ad66a1bd442f9a',
            toAddr: '0x010000000000000000000000000000000000000a',
            v: '1037',
            r: '3533784019370547145282176390487749992597443078055491502810099045124262588879',
            s: '34353248861773555333381280840120034249758805891701209314785801074144522535441',
            receipt: {
                root: null,
                status: 1,
                cumulativeGasUsed: 53392,
                logsBloom:
                    '0x00000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000001000001000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000001000010000000000000000000',
                logs: [
                    {
                        address: '0x010000000000000000000000000000000000000a',
                        topics: [
                            '0xf64784c1c207eed151b4adc53adde03b1c3a4ecad6b8de3a65539d464b3e1add',
                            '0x000000000000000000000000cb09fb9dbd7e956eb4efd0ca37f02847b97aac0d',
                        ],
                        data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
                        blockNumber: '0x12',
                        transactionHash:
                            '0xfd8d1501d36132eee50372292a94514f79a488c4266fd589cefeccc895b450eb',
                        transactionIndex: '0x0',
                        blockHash:
                            '0xab79c5b1c3518544e64b161d156527966defb95b098f5469eda67d91f5e1dc7b',
                        logIndex: '0x0',
                        removed: false,
                    },
                ],
                transactionHash:
                    '0xfd8d1501d36132eee50372292a94514f79a488c4266fd589cefeccc895b450eb',
                contractAddress: null,
                transactionIndex: 0,
                gasUsed: 53392,
                blockHash: '0xab79c5b1c3518544e64b161d156527966defb95b098f5469eda67d91f5e1dc7b',
                blockNumber: 18,
                effectiveGasPrice: 200000000000,
            },
        },
    ],
}
