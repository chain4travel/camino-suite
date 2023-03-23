import moment from 'moment'

describe('Display validators', () => {
    before(() => {
        cy.visit('/')
    })

    it('Display validators', () => {
        cy.intercept('POST', '**/v2/validatorsInfo', req => {
            console.log(data)
            req.reply({
                statusCode: 200,
                body: data,
            })
        }).as('getValidatorsInfo')
        cy.addKopernikusNetwork()

        cy.get('[data-cy="activeValidators"]')
            .invoke('text')
            .then(numberOfValidators => {
                expect(parseInt(numberOfValidators)).equal(data.value.length)
                cy.log(numberOfValidators).as('numberOflValidators')
            })

            cy.get('[data-cy="activeValidators"]').click()

        cy.get('[data-cy="validator-status"] > .MuiChip-label')
            .invoke('text')
            .then(status => {
                expect(status).equal(data.value[0].connected ? 'Connected' : 'Disconnected')
                cy.log(status).as('status')
            })

            cy.get('[data-cy="nodeId"]')
            .invoke('text')
            .then(NodeID => {
                expect(NodeID).equal(data.value[0].nodeID)
                cy.log(NodeID).as('nodeID')
            })

            cy.get('[data-cy="startTime"]')
            .invoke('text')
            .then(startTime => {
                const newStartTime = data.value[0].startTime.split(' ')
                expect(moment(startTime).format()).equal(moment(newStartTime[0]).format())
                cy.log(startTime).as('startTime')})

                cy.get('[data-cy="endTime"]')
            .invoke('text')
            .then(endTime => {
                const newEndTime = data.value[0].endTime.split(' ')
                expect(moment(endTime).format()).equal(moment(newEndTime[0]).format())
                cy.log(endTime).as('endTime')
            })

            cy.get('[data-cy="uptime"]')
            .invoke('text')
            .then(upTime => {
                expect(upTime).equal(data.value[0].uptime * 100 + '%')
                cy.log(upTime).as('upTime')
            })

            cy.get('[data-cy="txID"]')
            .invoke('text')
            .then(txID => {
                expect(txID).equal(data.value[0].txID)
                cy.log(txID).as('txID')
            })
    })
})

let data = {
    name: 'GeoIPInfo',
    value: [
        {
            nodeID: 'NodeID-AK7sPBsZM9rQwse23aLhEEBPHZD5gkLrL',
            txID: '22a1sGn84Q2guzou2MWSEQjcWkTUF17hvcVbVnwt8XBwdctMNL',
            connected: true,
            uptime: 1,
            lng: 0,
            lat: 0,
            IP: '',
            startTime: '2022-12-14 18:00:00',
            endTime: '2023-12-14 18:00:00',
            duration: '365 Days',
            country: '',
            countryISO: '',
            city: '',
        },
    ],
}
