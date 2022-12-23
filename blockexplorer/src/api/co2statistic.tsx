
import moment from 'moment';
import axios from 'axios';
import testData from './testData.json';
import testData2 from './testData2.json';

let urlCO2Api = "http://localhost:5001/";
let blockchainName = "caminocolumbus";
let daysDiff = -1;

export const fetchDailyEmissions = () => {
    return new Promise((resolve, reject) => {

        resolve(testData);

        /*
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
        */
    });
}

export const fetchNetworkEmissions = () => {
    return new Promise((resolve, reject) => {

        resolve(testData2);

        /*
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
        */
    });
}