import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const TimeSeriesMeter = ({ dataSeries, darkMode, titleText }) => {

    const validateMappedSeries = (series) => {
        return series.map((dat) => {
            if(dat != null && dat != undefined)
            {
                return {
                    name: dat.time,
                    y: dat.value
                }
            }
            else
            {
                return {
                    name: "",
                    y: null
                }
            }
        });
    }

    const options = {
        chart: {
            zoomType: 'x',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: "",
            style: {
                color: darkMode ? 'white' : 'black'
            }
        },
        yAxis: {
            title: {
                text: 'gCO2',
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
                    return `<span style="color:${darkMode == true ? 'white' : 'black'}">${dataDay != undefined && dataDay != null ? moment(dataDay.time).format("D MMM") : ""
                    }</span>`;
                },
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {

                color: '#41547C',
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#41547C'],
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
            data: dataSeries != null && dataSeries != undefined ? validateMappedSeries(dataSeries) : []
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
