import { Injectable } from "@angular/core";
import { ChartOptions } from "../models/chart.models";
import { IChartRenderer } from "../models/interfaces";
import { CanvasHelperService } from "./canvas-helper.service";
import { ChartUtilsService } from "./chart-utils.service";

@Injectable({
  providedIn: 'root'
})
export class ChartRendererService implements IChartRenderer {
  private options!: ChartOptions;
  private dimensions = {
    width: 800,
    height: 400,
    marginX: 50,
    marginY: 50,
    scaleX: 10,
    scaleY: 10
  };

  constructor(
    private canvasHelper: CanvasHelperService,
    private utils: ChartUtilsService
  ) {}

  initialize(canvas: HTMLCanvasElement, options: ChartOptions): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    
    this.canvasHelper.initialize(ctx);
    this.options = this.preprocessOptions(options);
    this.setupDimensions(canvas);
  }

  render(): void {
    this.canvasHelper.clear();
    this.drawAxes();
    this.drawSeries();
  }

  private preprocessOptions(options: ChartOptions): ChartOptions {
    return {
      ...options,
      lines: options.lines?.map(line => ({
        ...line,
        color: line.color || this.utils.getDefaultColors()[0]
      })),
      bars: options.bars?.map(bar => ({
        ...bar,
        color: bar.color || this.utils.getDefaultColors()[1]
      })),
      dots: options.dots?.map(dot => ({
        ...dot,
        color: dot.color || this.utils.getDefaultColors()[2]
      }))
    };
  }

  private setupDimensions(canvas: HTMLCanvasElement): void {
    console.log(canvas.width, canvas.height);
    this.dimensions.width = canvas.width;
    this.dimensions.height = canvas.height;
    this.calculateScales();
  }

  private calculateScales(): void {
    const { width, height, marginX, marginY } = this.dimensions;
    const { xAxis, yAxis } = this.options;

    this.dimensions.scaleX = (width - 2 * marginX) / (xAxis.max - xAxis.min);
    this.dimensions.scaleY = (height - 2 * marginY) / (yAxis.max - yAxis.min);
  }

  private drawAxes(): void {
    const { width, height, marginX, marginY, scaleX, scaleY } = this.dimensions;
    const { xAxis, yAxis } = this.options;

    // X ekseni çizimi
    this.canvasHelper.drawLine(
      marginX, 
      height - marginY,
      width - marginX,
      height - marginY,
      'black'
    );

    // Y ekseni çizimi  
    this.canvasHelper.drawLine(
      marginX,
      marginY,
      marginX,
      height - marginY,
      'black'
    );

    // X ekseni başlığı
    this.canvasHelper.drawText(
      xAxis.title,
      width / 2,
      height - marginY / 3,
      { align: 'center', baseline: 'middle' }
    );

    // Y ekseni başlığı
    this.canvasHelper.drawText(
      yAxis.title,
      marginX / 3,
      height / 2,
      { align: 'center', baseline: 'middle'}
    );

    // X ekseni değerleri
    const xStep = (xAxis.max - xAxis.min) / (typeof xAxis.ticks === 'number' ? xAxis.ticks : 5);
    for (let x = xAxis.min; x <= xAxis.max; x += xStep) {
      const xPos = marginX + (x - xAxis.min) * scaleX;
      this.canvasHelper.drawLine(xPos, height - marginY - 5, xPos, height - marginY + 5, 'black');
      this.canvasHelper.drawText(x.toString(), xPos, height - marginY + 20);
    }

    // Y ekseni değerleri
    const yStep = (yAxis.max - yAxis.min) / (typeof yAxis.ticks === 'number' ? yAxis.ticks : 5);
    for (let y = yAxis.min; y <= yAxis.max; y += yStep) {
      const yPos = height - marginY - (y - yAxis.min) * scaleY;
      this.canvasHelper.drawLine(marginX - 5, yPos, marginX + 5, yPos, 'black');
      this.canvasHelper.drawText(y.toString(), marginX - 20, yPos);
    }
  }

  private drawSeries(): void {
    this.options.bars?.forEach(bar => this.drawBarSeries(bar));
    this.options.lines?.forEach(line => this.drawLineSeries(line));
    this.options.dots?.forEach(dot => this.drawDotSeries(dot));
  }

  private drawBarSeries(bar: any): void {
    const { scaleX, scaleY, marginX, marginY, height } = this.dimensions;
    const { xAxis, yAxis } = this.options;

    bar.data.forEach((value: number[], index: number) => {
      const x: number = marginX + (index * scaleX);
      const barHeight: number = value[1] * scaleY;
      const y: number = height - marginY - barHeight;
      const barWidth: number = scaleX * 0.8; // Çubukların genişliği

      this.canvasHelper.drawRect(
        x,
        y,
        barWidth,
        barHeight,
        bar.color
      );
    });
  }

  private drawLineSeries(line: any): void {
    const { scaleX, scaleY, marginX, marginY, height } = this.dimensions;
    
    this.canvasHelper.beginPath();
    line.data.forEach((value: number[], index: number) => {
      console.log(index, value);
      const x = marginX + (index * scaleX);
      const y = height - marginY - (value[1] * scaleY);
      
      if (index === 0) {
        this.canvasHelper.moveTo(x, y);
      } else {
        this.canvasHelper.lineTo(x, y);
      }
    });
    
    this.canvasHelper.stroke(line.color);
  }

  private drawDotSeries(dot: any): void {
    const { scaleX, scaleY, marginX, marginY, height } = this.dimensions;
    
    dot.data.forEach((value: number[], index: number) => {
      const x = marginX + (index * scaleX);
      const y = height - marginY - (value[1] * scaleY);
      
      this.canvasHelper.drawCircle(
        x,
        y,
        4,
        dot.color
      );
    });
  }
} 