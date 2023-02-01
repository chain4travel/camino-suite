import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ConfigLinearMeter from './ConfigLinearMeter';
import './style.css'

const LinearMeter = ({ darkMode, titleText, data, typeStatistic }) => {
 let config = new ConfigLinearMeter(typeStatistic, titleText, data)


  if (config.data != undefined && config.data != null) {

    const options = {
      title: {
        text: "",
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
          text: titleText,
        },
        labels: {
          useHTML: true,
          formatter: function (obj) { return `<span style="text-align: center;color:${darkMode === true ? 'white' : 'black'}"> ${obj.value}</span>` },
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range',
        },
        categories: config.getCategories(),

        labels: {
          useHTML: true,
          formatter: function (obj) { return `<span style="text-align: center;color:${darkMode === true ? 'white' : 'black'}"> ${obj.value}</span>` },
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
          marker: {
            states: {
              hover: {
                radius: 3
              }
            }
          }
        },
      },
      tooltip: {
        
        formatter: function (tooltip) {
          let indexData = this.point.index;
          return config.getTooltip(indexData);
        },
      },
      series: [
        {
          name: titleText,
          data: config.getMappedSeries(),
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
  }
  else {
    return (<></>);
  }
};

export default LinearMeter;
