import { Paper } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FC, useState } from 'react';
import Chart from 'react-apexcharts';

const Overview = () => {
  return (
    <>
      <OverviewItem title="Sản phẩm đã bán" value={5} color="primary" data={[1, 1, 1, 2]} />
      <OverviewItem title="Tổng doanh thu" value={400000} color="secondary" data={[80, 100, 95, 125]} />
      <OverviewItem title="Đơn hàng" value={4} color="warning" data={[2, 1, 1]} />
    </>
  );
};

interface OverviewItemProps {
  title: string;
  value: number;
  color: 'primary' | 'secondary' | 'warning';
  data?: number[];
}

const OverviewItem: FC<OverviewItemProps> = ({ title, value, color, data }) => {
  const options: ApexOptions = {
    chart: {
      id: 'money-chart',
      width: '100%',
      toolbar: {
        show: false,
      },
      background: 'transparent',
      type: 'line',
    },
    colors: [`var(--${color}-color)`],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      labels: { show: false },
      categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      showAlways: true,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: false,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: () => {
            return '';
          },
        },
      },
    },
    grid: {
      show: false,
    },
  };
  const [series] = useState([
    {
      data: data || Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 5),
    },
  ]);

  return (
    <Paper className="flex items-center p-6">
      <div className="flex-1">
        <h6 className="mb-4 text-sm font-semibold">{title}</h6>
        <h3 className="mb-2 text-3xl font-bold">{value}</h3>
      </div>
      <Chart options={options} series={series} width={96 + 22} height={64 + 45} />
    </Paper>
  );
};

export default Overview;
