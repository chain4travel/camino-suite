import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarMeter = ({ nodesPerCountry }) => {
    let darkMode = true;

   const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            align: 'left',
            text: 'Daily Emissions',
            style: {
                color: 'white'
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
                    return `<span style="color:${darkMode == true ? 'white' : 'black'}">${obj.value}</span>`;
                },
            }
        },
        yAxis: {
            title: {
                text: 'CO2',
                style: {
                    color: 'white'
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
                name: "Browsers",
                //colorByPoint: true,
                color: '#41547C',
                data: [
                    {
                        name: "Chrome",
                        y: 12,
                        drilldown: "Chrome"
                    },
                    {
                        name: "Safari",
                        y: 19.84,
                        drilldown: "Safari"
                    },
                    {
                        name: "Opera",
                        y: 19.84,
                        drilldown: "Safari"
                    },

                    {
                        name: "Mozilla",
                        y: 19.84,
                        drilldown: "Safari"
                    }
                ]
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

export default BarMeter;
