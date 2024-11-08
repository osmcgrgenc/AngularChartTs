export interface ChartOptions {
  lines?: LineSeries[];
  bars?: BarSeries[];
  dots?: DotSeries[];
  xAxis: AxisOptions;
  yAxis: AxisOptions;
  barSep?: boolean;
}

export interface AxisOptions {
  title: string;
  min: number;
  max: number;
  ticks?: number | string;
  timeSeries?: boolean;
  timeUnit?: 's' | 'm' | 'h' | 'd';
}

export interface SeriesBase {
  data: [number, number][];
  color?: string;
  label?: string;
}

export interface LineSeries extends SeriesBase {
  thickness?: number;
}

export interface BarSeries extends SeriesBase {
  width?: number;
  opacity?: number;
}

export interface DotSeries extends SeriesBase {
  radius?: number;
} 