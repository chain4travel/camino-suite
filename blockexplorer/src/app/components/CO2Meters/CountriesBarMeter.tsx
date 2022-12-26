import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dataTest from './testFlags.json';
import flags from '../NodesMap/json/flags.json';

const CountriesBarMeter = ({ darkMode, titleText }) => {

    const getUrlFlag = index => {
        let objFlag = dataTest.Value[index];
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
                    return `<div style="text-align: center;color:${
                      darkMode == true ? 'white' : 'black'
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
                name: "",
                //colorByPoint: true,
                color: '#41547C',
                data: dataTest.Value.map((dat) => {
                    return {
                        name: dat.countryName,
                        y: dat.value,
                        drilldown: dat.countryName
                    }
                })
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
