import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LinearMeter = ({ darkMode, titleText, dataChart }) => {

  console.log("dataChart", dataChart);

  const data = {
    Name: 'Transactions per day',
    Value: dataChart.TxInfo,
  };

  const mapSeries = serie => {
    return serie.map((value, index) => {
      return { y: value.TotalTransactions, name: value.Date };
    });
  };



  const options = {
    title: {
      text: titleText,
      style: {
        color: darkMode ? 'white' : 'black',
      },
    },
    chart: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      gridLineColor: darkMode ? 'hsl(221, 0%, 20%)' : 'hsl(221, 0%, 80%)',
      title: {
        text: 'transactions',
      },
      labels: {
        useHTML: true,
        formatter: function (obj) {
          let index = obj.pos;
          return `<span style="text-align: center;color:${
            darkMode === true ? 'white' : 'black'
          }"> ${obj.value}</span>`;
        },
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range',
      },
      categories: data.Value.map((value, index) => value.Date),

      labels: {
        useHTML: true,
        formatter: function (obj) {
          let index = obj.pos;
          return `<span style="text-align: center;color:${
            darkMode === true ? 'white' : 'black'
          }"> ${obj.value}</span>`;
        },
      },
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    tooltip: {
      positioner: function (width, height, point) {
        let pointX = point.plotX;

        return {
          x:
            pointX > 100
              ? point.plotX - this.chart.plotLeft
              : point.plotX + this.chart.plotLeft,
          y: 50,
        };
      },
      formatter: function (tooltip) {

        console.log("tooltipData", tooltip);


        let dataTolltip = {
          dateTime: 'Friday, June 14, 2019',//PENDING TIME, example Friday, June 14, 2019
          totalTransactions: 825.364,
          avgDifficulty: '2,000 TH',
          estHashRate: '159,829 GH',
          avgBlockTime: '13,17',
          avgBlockSize: '28,17',
          totalBlockCount: '6,410',
          totalUnclesCount: '478',
          newAdressSen: '86,074',
        };
        const header = `<span>
          ${dataTolltip.dateTime}
          <br/>
          [<label style="color: blue">Total Transactions:</label> <b>${dataTolltip.totalTransactions}</b>]
          <br/>
          <br/>


          -<b>Avg Difficulty:</b>${dataTolltip.avgDifficulty} <br/>
          -<b>Est Hash Rate:</b>${dataTolltip.estHashRate} <br/>
          -<b>Avg Block Time:</b>${dataTolltip.avgBlockTime} <br/>
          -<b>Avg Block Size:</b>${dataTolltip.avgBlockSize} <br/>
          -<b>Total Block Count:</b>${dataTolltip.totalBlockCount} <br/>
          -<b>Total Uncles Count:</b>${dataTolltip.totalUnclesCount} <br/>
          -<b>New Adress Seen:</b>${dataTolltip.newAdressSen}
          
          </span><br/>`;
        return header;
      },
    },

    series: [
      {
        name: 'Highest number of Transactions',
        data: mapSeries(data.Value),
        color: 'hsl(221, 48%, 75%)',
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <br />
      <HighchartsReact type="" highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LinearMeter;
