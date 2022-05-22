import { promises as fs } from 'fs';
import { ChartJSNodeCanvas, ChartCallback } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import { randomRgba } from './random-rgba';
import * as dayjs from 'dayjs';

export async function generateChartImage(map: Map<string, number>) {
  //TODO: отсортировать по дате
  const data = Array.from(map.entries())
    .map(([date, count]) => ({
      x: date,
      y: count,
    }))
    .sort((a, b) =>
      dayjs(a.x, 'DD-MM-YYYY').isBefore(dayjs(b.x, 'DD-MM-YYYY')) ? -1 : 1,
    );

  const width = 1920;
  const height = 1080;

  const bgColors = new Array(map.size).fill('').map(() => randomRgba('0.2'));
  const borderColors = new Array(map.size).fill('').map(() => randomRgba('1'));

  const configuration: ChartConfiguration<'bar', any> = {
    type: 'bar',
    data: {
      labels: Array.from(map.keys()),
      datasets: [
        {
          label: '# of messages',
          data: data,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 5,
        },
      ],
    },
    options: {},
    plugins: [
      {
        id: 'background-colour',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        },
      },
    ],
  };

  const chartCallback: ChartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    chartCallback,
  });

  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  await fs.writeFile('./example.png', buffer, 'base64');
}
