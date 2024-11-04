type ChartOptions = {
  lines?: { data: [number, number][], color?: string }[];
  bars?: { data: [number, number][], color?: string, opacity?: number, radius?: number }[];
  xAxis: { title: string; min: number; max: number; ticks?: number | string; timeSeries?: boolean };
  yAxis: { title: string; min: number; max: number; ticks?: number };
  barSep?: number;
};

export const exampleCharts: ChartOptions[] = [
  {
    xAxis: { title: 'Time', min: 0, max: 10, ticks: 1 },
    yAxis: { title: 'Value', min: 0, max: 100, ticks: 10 },
    lines: [
      { data: [[0, 10], [2, 30], [4, 50], [6, 70], [8, 90]], color: 'steelblue' }
    ]
  },
  {
    xAxis: { title: 'Years', min: 2010, max: 2020, ticks: 1, timeSeries: true },
    yAxis: { title: 'Population', min: 0, max: 500, ticks: 50 },
    bars: [
      { data: [[2010, 100], [2012, 200], [2014, 300], [2016, 400], [2018, 450]], color: 'limegreen', opacity: 0.8, radius: 5 }
    ]
  },
  {
    xAxis: { title: 'Categories', min: 1, max: 5, ticks: 1 },
    yAxis: { title: 'Amount', min: 0, max: 50, ticks: 10 },
    bars: [
      { data: [[1, 10], [2, 20], [3, 30], [4, 40], [5, 50]], color: 'orange', opacity: 0.7, radius: 10 }
    ],
    lines: [
      { data: [[1, 15], [2, 25], [3, 35], [4, 45], [5, 25]], color: 'red' }
    ]
  },
  {
    xAxis: { title: 'Days', min: 1, max: 7, ticks: 1 },
    yAxis: { title: 'Temperature (°C)', min: -10, max: 40, ticks: 10 },
    lines: [
      { data: [[1, 5], [2, 10], [3, 15], [4, 25], [5, 30], [6, 35], [7, 40]], color: 'red' }
    ]
  },
  {
    xAxis: { title: 'Months', min: 0, max: 12, ticks: 1 },
    yAxis: { title: 'Sales', min: -750, max: 750, ticks: 50 },
    bars: [
      { data: Array.from({length: 12}, (_, i) => [i%12, i*50 * (i%2?1:-1)]), color: 'steelblue', opacity: 0.5, radius: 1 }
    ]
  }
];
