
import moment from 'moment';
import axios from 'axios';

let urlCO2Api = "http://localhost:5001/";
let blockchainName = "caminocolumbus";
let daysDiff = -3;

export const fetchCarbonIntensityFactor = () => {
    return new Promise((resolve, reject) => {
        let dateToday = moment(new Date()).format("YYYY-MM-DD");
        let dateYesterday = moment(new Date()).add(daysDiff, 'days').format("YYYY-MM-DD");

        var data = JSON.stringify({
            "chain": blockchainName,
            "from": dateYesterday,
            "to": dateToday
        });

        var config = {
            method: 'post',
            url: `${urlCO2Api}carbon-intensity-factor`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve([]);
        });
    })
}

export const fetchHolding = () => {
    return new Promise((resolve, reject) => {
        let dateToday = moment(new Date()).format("YYYY-MM-DD");
        let dateYesterday = moment(new Date()).add(daysDiff, 'days').format("YYYY-MM-DD");

        var data = JSON.stringify({
            "chain": blockchainName,
            "from": dateYesterday,
            "to": dateToday
        });

        var config = {
            method: 'post',
            url: `${urlCO2Api}holding`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve([]);
        });
    })
}

export const fetchHybrid = (amount: number, transactions: number) => {
    return new Promise((resolve, reject) => {
        //let dateToday = moment(new Date()).format("YYYY-MM-DD");
        let dateToday = moment(new Date()).add(daysDiff, 'days').format("YYYY-MM-DD");

        var data = JSON.stringify({
            "chain": blockchainName,
            "date": dateToday,
            "amount": amount,
            "transactions": transactions
        });

        var config = {
            method: 'post',
            url: `${urlCO2Api}hybrid`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve([]);
        });
    })
}

export const fetchNetwork = () => {
    return new Promise((resolve, reject) => {
        let dateToday = moment(new Date()).format("YYYY-MM-DD");
        let dateYesterday = moment(new Date()).add(daysDiff, 'days').format("YYYY-MM-DD");

        var data = JSON.stringify({
            "chain": blockchainName,
            "from": dateYesterday,
            "to": dateToday
        });

        var config = {
            method: 'post',
            url: `${urlCO2Api}network`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve([]);
        });
    })
}

export const fetchTransaction = () => {
    return new Promise((resolve, reject) => {
        let dateToday = moment(new Date()).format("YYYY-MM-DD");
        let dateYesterday = moment(new Date()).add(daysDiff, 'days').format("YYYY-MM-DD");

        var data = JSON.stringify({
            "chain": blockchainName,
            "from": dateYesterday,
            "to": dateToday
        });

        var config = {
            method: 'post',
            url: `${urlCO2Api}transaction`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve([]);
        });
    })
}