import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LinearMeter = ({ darkMode, titleText }) => {

    const data = {
        Name: "Transactions",
        Value: {
            HighestData: [
                {name: 'first event', data: 23432, date: "2022-12-28"},
                {name: 'second event', data: 25432, date: "2022-12-29"},
                {name: 'third event', data: 28432, date: "2022-12-30"},
                {name: 'fourth event', data: 13432, date: "2022-12-31"},
            ],
            LowestData: [
                {name: 'first event', data: 12432, date: "2022-12-28"},
                {name: 'second event', data: 15432, date: "2022-12-29"},
                {name: 'third event', data: 18432, date: "2022-12-30"},
                {name: 'fourth event', data: 7432, date: "2022-12-31"},
            ]
        }
    }

    const mapSeries = (serie) => {
        return serie.map((value, index) => {
            return { y: value.data, name: value.name}
        });
    }
 const options = {
    title: {
        text: titleText,
        style: {
            color: darkMode ? 'white' : 'black'
        }
    },
    chart: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    credits: {
        enabled: false,
    },
    yAxis: {
        gridLineColor: darkMode ? "hsl(221, 0%, 20%)" : "hsl(221, 0%, 80%)" ,
        title: {
            text: 'transactions'
        },
        labels: {
            useHTML: true,
            formatter: function (obj) {
                let index = obj.pos;
                return `<span style="text-align: center;color:${darkMode == true ? 'white' : 'black'
                    }"> ${obj.value}</span>`;
            },
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range'
        },
        categories: data.Value.HighestData.map((value, index) => value.date),
        
       
        labels: {
            useHTML: true,
            formatter: function (obj) {
                let index = obj.pos;
                return `<span style="text-align: center;color:${darkMode == true ? 'white' : 'black'
                    }"> ${obj.value}</span>`;
            },
        }

    },

    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
            color: darkMode ? 'white' : 'black'
        },
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },


    series: [
        {
        name: 'Highest number of Transactions',
        data: mapSeries(data.Value.HighestData),
        color: 'hsl(221, 48%, 75%)',
    },
    {
        name: 'Lowest number of Transactions',
        data: mapSeries(data.Value.LowestData),
        color: 'hsl(221, 48%, 50%)',
    }
],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
 }
 return (
    <div>
        <br />
        <HighchartsReact type="" highcharts={Highcharts} options={options} />
    </div>
);
}

export default LinearMeter