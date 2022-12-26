import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const TimeSeriesMeter = ({ dataSeries, darkMode, titleText }) => {

    const options = {
        chart: {
            zoomType: 'x',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: titleText,
            style: {
                color: darkMode ? 'white' : 'black'
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
                style: {
                    fontSize: '14px',
                    color: darkMode ? 'white' : 'black'
                }
            },
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    color: darkMode ? 'white' : 'black'
                },
                useHTML: true,
                formatter: function (obj) {
                    let index = obj.pos;
                    let dataDay = dataSeries[index];
                    return `<span style="color:${darkMode == true ? 'white' : 'black'}">${moment(dataDay.time).format("MM-DD")}</span>`;
                },
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        credits: {
            enabled: false,
        },

        series: [{
            type: 'area',
            name: 'CO2',
            data: dataSeries.map((dat) => {
                return {
                    name: dat.time,
                    y: dat.value
                }
            })
        }]
    }


    return (
        <div>
            <br />
            <HighchartsReact type="" highcharts={Highcharts} options={options} />
        </div>
    );
};

export default TimeSeriesMeter;
