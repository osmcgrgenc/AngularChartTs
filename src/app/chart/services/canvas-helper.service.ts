import { Injectable } from '@angular/core';
import { ICanvasHelper, TextOptions } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CanvasHelperService implements ICanvasHelper {
  private ctx!: CanvasRenderingContext2D;

  initialize(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color = 'black'): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawCircle(x: number, y: number, radius: number, color: string): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawRect(x: number, y: number, width: number, height: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text: string, x: number, y: number, options: TextOptions = {}): void {
    const { color = 'black', align = 'center', baseline = 'middle', font = '12px Arial' } = options;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }
  beginPath(): void {
    this.ctx.beginPath();
  }

  lineTo(x: number, y: number): void {
    this.ctx.lineTo(x, y);
    this.ctx.restore();
  }

  stroke(options?: CanvasRenderingContext2D['strokeStyle']): void {
    if (options) {
      this.ctx.strokeStyle = options;
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  moveTo(x: number, y: number): void {
    this.ctx.moveTo(x, y);
  }
} 
