import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dataTest from './testFlags.json';
import sortBy from 'lodash/sortBy';

const CountriesBarMeter = ({ darkMode, titleText, levelColor }) => {

    const sortByAndLoadBar = (data) => {
        let sortedData = sortBy(data, o => -o.value);
        let dataChart = sortedData.map((dat, index) => {

            console.log("dataSorted", data);
            return {
                name: dat.country,
                y: dat.value,
                drilldown: dat.country,
                color: `hsl(221, 48%, ${(index + 1) * (90/sortedData.length)}%)`
            }
        });
        return dataChart;
    }

    const getUrlFlag = index => {
        let sortedData = sortBy(dataTest.Value, o => -o.value);
        let objFlag = sortedData[index];
        let code = objFlag.country;
        let url = `/assets/flags/${code.toLowerCase()}.svg`;
        return url;
    };

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            align: 'left',
            text: titleText,
            style: {
                color: darkMode ? 'white' : 'black'
            }
        },
        /*
        subtitle: {
            align: 'left',
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        */
        xAxis: {
            type: 'category',
            labels: {
                useHTML: true,
                formatter: function (obj) {
                    let index = obj.pos;
                    return `<div style="text-align: center;color:${darkMode == true ? 'white' : 'black'
                        }"><img width="15" height="15" style="position: relative; top: 2px" src="${getUrlFlag(
                            index,
                        )}" /> <br/> ${obj.value}</div>`;
                },
            }
        },
        yAxis: {
            title: {
                text: 'CO2',
                style: {
                    color: darkMode ? 'white' : 'black'
                }
            },
            labels: {
                useHTML: true,
                formatter: function (obj) {
                    let index = obj.pos;
                    return `<span style="color:${darkMode == true ? 'white' : 'black'}">${obj.value}</span>`;
                },
            }

        },
        legend: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                borderColor: 'transparent',
                name: "",
                //colorByPoint: true,
                color: '#41547C',
                data: sortByAndLoadBar(dataTest.Value)
            }
        ]
    }


    return (
        <div>
            <br />
            <HighchartsReact type="" highcharts={Highcharts} options={options} />
        </div>
    );
};

export default CountriesBarMeter;
