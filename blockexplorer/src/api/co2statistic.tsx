import axios from 'axios';

let defaultData = {
    Name: "",
    Value: []
}

export const fetchDailyEmissions = () => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: `https://63a5dd8af8f3f6d4ab01d763.mockapi.io/v2/dailyEmissions`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve(defaultData);
        });
    });
}

export const fetchNetworkEmissions = () => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: `https://63a5dd8af8f3f6d4ab01d763.mockapi.io/v2/networkEmissions`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve(defaultData);
        });
    });
}

export const fetchTransactionsEmissions = () => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: `https://63a5dd8af8f3f6d4ab01d763.mockapi.io/v2/transactionEmissions`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            resolve(defaultData);
        });
    });
}