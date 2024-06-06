import { Paper } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const MonthlySale = () => {
  const [month] = useState(moment().month() + 1);
  const [year] = useState(moment().year());

  const getDaysInMonth = (month: number, year: number) => {
    return moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const currentDate = moment().date();

  const series = [
    {
      name: 'Doanh Thu',
      data: Array.from({ length: daysInMonth }, (_, i) => (i < currentDate ? Math.floor(Math.random() * 120) + 25 : 0)),
    },
    {
      name: 'Chi phí',
      data: Array.from({ length: daysInMonth }, (_, i) => (i < currentDate ? Math.floor(Math.random() * 100) + 10 : 0)),
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      title: {
        text: 'Ngày',
      },
    },
    yaxis: {
      title: {
        text: 'Số Tiền (VND)',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        gradientToColors: ['#fff', '#ffffff'],
        opacityFrom: 0.2,
      },
    },
    colors: ['var(--primary-color)', 'var(--warning-color)'],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Paper className="p-6 col-span-full">
      <h4 className="mb-6 text-lg font-bold">Doanh thu hàng tháng</h4>
      <Chart options={options} series={series} type="area" />
    </Paper>
  );
};

export default MonthlySale;
