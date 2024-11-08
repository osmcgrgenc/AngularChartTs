import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions } from './models/interfaces';
import { ChartRendererService } from './services/chart-renderer.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @Input() options!: ChartOptions;
  @Input() width = 1920;
  @Input() height = 500;
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private chartRenderer: ChartRendererService) {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && !changes['options'].firstChange) {
      this.initializeChart();
    }
  }

  private initializeChart(): void {
    //if (!this.chartCanvas) return;
    const canvas = this.chartCanvas.nativeElement;
    this.chartRenderer.initialize(canvas, this.options);
    this.chartRenderer.render();
  }
}
