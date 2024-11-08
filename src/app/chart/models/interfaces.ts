import { ChartOptions } from "./chart.models";
export type { ChartOptions };
export interface IChartRenderer {
  initialize(canvas: HTMLCanvasElement, options: ChartOptions): void;
  render(): void;
}

export interface ICanvasHelper {
  clear(): void;
  drawLine(x1: number, y1: number, x2: number, y2: number, color?: string): void;
  drawCircle(x: number, y: number, radius: number, color: string): void;
  drawRect(x: number, y: number, width: number, height: number, color: string): void;
  drawText(text: string, x: number, y: number, options?: TextOptions): void;
}

export interface TextOptions {
  color?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  font?: string;
} 