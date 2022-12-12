import React, { Fragment, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import flags from './flags.json';
import sortBy from 'lodash/sortBy';
import Twemoji from 'react-twemoji';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Stadistics = ({ nodesPerCountry }: any) => {
  const [isMoible, setIsMobile] = useState(false);
  const [loadingRezise, setLoadingRezise] = useState(true);

  const options = {
    indexAxis: 'y' as const,
    color: '#64748B',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#64748B',
          fontFamily: 'NotoColorEmojiLimited',
          callback: function (value: any, index: any, ticks: any) {
            return (
              getStringFlag(nodesPerCountry[index].alpha2) +
              ' ' +
              nodesPerCountry[index].country
            );
          },
          padding: 30,
        },
      },
      x: {
        ticks: { color: '#64748B' },
      },
    },
  };

  const getStringFlag = (countryCode: string) => {
    try {
      let flagUnicode = flags.find(
        fl => fl.code.toString() == countryCode.toString(),
      );
      return flagUnicode?.emoji;
    } catch (e) {
      console.log(e);
    }
  };

  const labels = nodesPerCountry.map((item: any) => item.country);

  const data = {
    labels,
    datasets: [
      {
        label: 'Nodes',
        data: nodesPerCountry.map((item: any) => item.nodes.length),
        backgroundColor: '#41547C',
        borderColor: 'white',
      },
    ],
  };

  function updateWindowDimensions() {
    setLoadingRezise(true);
    setTimeout(() => {
      if (window.innerWidth < 720) {
        setIsMobile(true);
        ChartJS.defaults.datasets.bar.barThickness = 10;
      } else {
        setIsMobile(false);
        ChartJS.defaults.datasets.bar.barThickness = 35;
      }
      setLoadingRezise(false);
    }, 1);
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      updateWindowDimensions();
    });
  });

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  return (
    <Fragment>
      <Twemoji options={{ className: 'twemoji' }}>
        {loadingRezise == false ? (
          <Bar className="twemoji" options={options} data={data} />
        ) : null}
      </Twemoji>
    </Fragment>
  );
};

export default Stadistics;
