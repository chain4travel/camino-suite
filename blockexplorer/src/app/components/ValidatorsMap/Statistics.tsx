import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import flags from './json/flags.json';

const Statistics = ({ nodesPerCountry, darkMode }) => {
  const getUrlFlag = index => {
    let objFlag = nodesPerCountry[index];
    let code = flags.find(flag => flag.code == objFlag.alpha2);
    let url = `/assets/flags/${code?.code.toLowerCase()}.svg`;
    return url;
  };

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      text: '',
      display: 'none',
    },
    yAxis: {
      lineColor: 'transparent',
      gridLineColor: '#666666',
      title: '',
    },
    xAxis: {
      lineColor: 'transparent',
      gridLineColor: '#666666',
      categories: nodesPerCountry.map(value => value.country),
      labels: {
        useHTML: true,
        formatter: function (obj) {
          let index = obj.pos;
          return `<span style="color:${
            darkMode == true ? 'white' : 'black'
          }"><img width="15" height="15" style="position: relative; top: 2px" src="${getUrlFlag(
            index,
          )}" /> ${obj.value}</span>`;
        },
      },
    },

    legend: {
      itemStyle: {
        color: darkMode ? 'white' : 'black',
      },
    },
    series: [
      {
        borderColor: 'transparent',
        name: 'Nodes',
        color: '#41547C',
        data: nodesPerCountry.map(value => value.nodes.length),
        lineColor: 'transparent', // make the line invisible
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      formatter: function (obj) {
        let objData: any = this;
        return '<b>' + objData.x + ':</b>' + objData.y;
      },
    },
  };

  return (
    <div>
      <br />
      <HighchartsReact type="" highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Statistics;
