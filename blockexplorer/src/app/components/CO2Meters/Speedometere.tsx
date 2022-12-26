import React, { useState, Fragment } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { color } from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const BasicMeter = ({ 
    value,
    title,
    plotBands,
    maxValue
}) => {

    const optChart = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%',
            backgroundColor: 'rgba(0,0,0,0)',
        },

        title: {
            text: title,
            style: {
                color: 'white',
            }
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        yAxis: {
            min: 0,
            max: maxValue,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 20,
                style: {
                    fontSize: '14px',
                    color: "white"
                }
            },
            plotBands: plotBands
        },

        series: [{
            name: 'CO2 Consumption',
            data: [value],
            tooltip: {
                valueSuffix: ' CO2'
            },
            dataLabels: {
                format: '{y} CO2',
                borderWidth: 0,
                style: {
                    fontSize: '16px',
                }
            },
            dial: {
                radius: '80%',
                backgroundColor: 'gray',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'gray',
                radius: 6
            }

        }]
    }

    const [options] = useState(optChart);

    return (
        <Fragment>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Fragment>
    );
};

export default BasicMeter;