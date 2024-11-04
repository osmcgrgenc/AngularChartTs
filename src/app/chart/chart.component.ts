import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() options: any;
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let uDate = (ts: number, format = {}) =>
      new Date(ts).toLocaleString(document.documentElement.lang || 'en', format);

    let isObject = (x: any) => x && typeof x === 'object' && !Array.isArray(x);

    let merge = (target: any, ...sources: any[]) => {
      sources.forEach((s) => {
        for (let k in s) {
          if (isObject(s[k])) {
            if (!isObject(target[k])) target[k] = {};
            merge(target[k], s[k]);
          } else {
            target[k] = s[k];
          }
        }
      });
      return target;
    };

    let limits = (series: any[], min: number, max: number, cb = (x: any) => x) => {
      series.forEach((d) => {
        min = Math.min(...d.map(cb), min);
        max = Math.max(...d.map(cb), max);
      });
      return [min, max];
    };

    let W = (canvas.width = canvas.clientWidth);
    let H = (canvas.height = canvas.clientHeight);

    let style = window.getComputedStyle(canvas);
    let em = parseFloat(getComputedStyle(document.documentElement).fontSize);

    let colors = ['orange', 'limegreen', 'steelblue', 'red', 'yellow'];
    let mx = 3 * em,
      my = 3 * em,
      xx = 0,
      yx = 0;

    let moveTo = (x: number, y: number) =>
      ctx.moveTo((x - this.options.xAxis.min) * xx, -(y - this.options.yAxis.min) * yx);
    let lineTo = (x: number, y: number) =>
      ctx.lineTo((x - this.options.xAxis.min) * xx, -(y - this.options.yAxis.min) * yx);
    let rect = (x: number, y: number, w: number, h: number, radius = 0) => {
      if (radius > 0) {
        ctx.beginPath();
        ctx.moveTo((x - this.options.xAxis.min) * xx + radius, -(y - this.options.yAxis.min) * yx);
        ctx.lineTo((x - this.options.xAxis.min) * xx + w * xx - radius, -(y - this.options.yAxis.min) * yx);
        ctx.quadraticCurveTo(
          (x - this.options.xAxis.min) * xx + w * xx,
          -(y - this.options.yAxis.min) * yx,
          (x - this.options.xAxis.min) * xx + w * xx,
          -(y - this.options.yAxis.min) * yx - radius
        );
        ctx.lineTo(
          (x - this.options.xAxis.min) * xx + w * xx,
          -(y - this.options.yAxis.min) * yx - h * yx + radius
        );
        ctx.quadraticCurveTo(
          (x - this.options.xAxis.min) * xx + w * xx,
          -(y - this.options.yAxis.min) * yx - h * yx,
          (x - this.options.xAxis.min) * xx + w * xx - radius,
          -(y - this.options.yAxis.min) * yx - h * yx
        );
        ctx.lineTo((x - this.options.xAxis.min) * xx + radius, -(y - this.options.yAxis.min) * yx - h * yx);
        ctx.quadraticCurveTo(
          (x - this.options.xAxis.min) * xx,
          -(y - this.options.yAxis.min) * yx - h * yx,
          (x - this.options.xAxis.min) * xx,
          -(y - this.options.yAxis.min) * yx - h * yx + radius
        );
        ctx.lineTo((x - this.options.xAxis.min) * xx, -(y - this.options.yAxis.min) * yx - radius);
        ctx.quadraticCurveTo(
          (x - this.options.xAxis.min) * xx,
          -(y - this.options.yAxis.min) * yx,
          (x - this.options.xAxis.min) * xx + radius,
          -(y - this.options.yAxis.min) * yx
        );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      } else {
        ctx.strokeRect(
          (x - this.options.xAxis.min) * xx,
          -(y - this.options.yAxis.min) * yx,
          w * xx,
          -h * yx
        );
        ctx.fillRect(
          (x - this.options.xAxis.min) * xx,
          -(y - this.options.yAxis.min) * yx,
          w * xx,
          -h * yx
        );
      }
    };
    let fillText = (s: string, x: number, y: number) =>
      ctx.fillText(s, (x - this.options.xAxis.min) * xx, (y - this.options.yAxis.min) * yx);
    let timeUnit: { [key: string]: number } = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    let setup = () => {
      this.options = merge(
        {
          lines: [],
          bars: [],
          xAxis: { title: '', min: Infinity, max: -Infinity, ticks: undefined },
          yAxis: { title: '', min: Infinity, max: -Infinity, ticks: undefined },
        },
        this.options
      );

      if (this.options.xAxis.timeSeries) {
        if (typeof this.options.xAxis.min == 'string')
          this.options.xAxis.min = new Date(this.options.xAxis.min).getTime();
        if (typeof this.options.xAxis.max == 'string')
          this.options.xAxis.max = new Date(this.options.xAxis.max).getTime();
        if (typeof this.options.xAxis.ticks == 'string') {
          let re = new RegExp('([0-9]+)([dhms])', 'g');
          let n = 0,
            z;
          while ((z = re.exec(this.options.xAxis.ticks))) n += parseInt(z[1]) * timeUnit[z[2]];
          this.options.xAxis.ticks = n;
        }
        this.options.lines.forEach((s: any, i: number) =>
          s.data.forEach((v: any, j: number) => {
            if (typeof v[0] == 'string')
              this.options.lines[i].data[j][0] = new Date(v[0]).getTime();
          })
        );
        this.options.bars.forEach((s: any, i: number) =>
          s.data.forEach((v: any, j: number) => {
            if (typeof v[0] == 'string')
              this.options.bars[i].data[j][0] = new Date(v[0]).getTime();
          })
        );
      }

      let series = [...this.options.lines.map((d: any) => d.data), ...this.options.bars.map((d: any) => d.data)];
      [this.options.xAxis.min, this.options.xAxis.max] = limits(series, this.options.xAxis.min, this.options.xAxis.max, (el) => el[0]);
      [this.options.yAxis.min, this.options.yAxis.max] = limits(series, this.options.yAxis.min, this.options.yAxis.max, (el) => el[1]);

      xx = (W - 2 * mx) / (this.options.xAxis.max - this.options.xAxis.min);
      yx = (H - 2 * my) / (this.options.yAxis.max - this.options.yAxis.min);

      ctx.translate(mx, H - my);
      ctx.textAlign = 'center';
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.font = style.font;
      ctx.fillStyle = ctx.strokeStyle = style.color;
    };

    let axes = () => {
      ctx.save();
      ctx.beginPath();

      moveTo(this.options.xAxis.min, this.options.yAxis.max);
      lineTo(this.options.xAxis.min, this.options.yAxis.min);
      lineTo(this.options.xAxis.max, this.options.yAxis.min);
      ctx.stroke();

      // x-axis title
      ctx.textBaseline = 'bottom';
      ctx.fillText(this.options.xAxis.title, W / 2 - mx, my);

      // y-axis title
      ctx.rotate(Math.PI / -2);
      ctx.textBaseline = 'top';
      ctx.fillText(this.options.yAxis.title, H / 2 - my, -mx);

      ctx.restore();
    };

    let ticks = () => {
      ctx.save();
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      if (this.options.xAxis.ticks > 0) {
        ctx.textBaseline = 'top';
        for (let x = this.options.xAxis.min; x <= this.options.xAxis.max; x += this.options.xAxis.ticks) {
          fillText(
            this.options.xAxis.timeSeries ? uDate(x, this.options.xAxis.timeSeries) : x,
            x,
            this.options.yAxis.min + 3
          );
          moveTo(x, this.options.yAxis.min);
          lineTo(x, this.options.yAxis.max);
        }
      }
      if (this.options.yAxis.ticks > 0) {
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        for (let y = this.options.yAxis.min; y <= this.options.yAxis.max; y += this.options.yAxis.ticks) {
          fillText(y, this.options.xAxis.min - 2, -y);
          moveTo(this.options.xAxis.min, y);
          lineTo(this.options.xAxis.max, y);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    let plotLine = (data: any[], color: string) => {
      if (data.length === 0) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      moveTo(data[0][0], data[0][1]);
      data.forEach((el) => lineTo(el[0], el[1]));
      ctx.stroke();
      ctx.restore();
    };

    let plotBar = (data: any[], color: string, n = 1, idx = 0, barSep = 1, radius = 0, opacity = 1) => {
      let w: number, dx: number;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = style.color;
      ctx.fillStyle = color;
      {
        let prev = -Infinity,
          diff = Infinity;
        data.forEach((d) => {
          diff = Math.min(diff, d[0] - prev);
          prev = d[0];
        });
        w = diff / (n + (barSep ? 1 : 0));
        dx = w * (idx - n / 2);
      }
      data.forEach((d) => rect(d[0] + dx, 0, w, d[1], radius));
      ctx.restore();
    };

    setup();
    axes();
    ticks();
    this.options.bars.forEach((d: any, idx: number) =>
      plotBar(d.data, d.color || colors[idx % colors.length], this.options.bars.length, idx, this.options.barSep, d.radius || 0, d.opacity || 1)
    );
    this.options.lines.forEach((d: any, idx: number) =>
      plotLine(d.data, d.color || colors[idx % colors.length])
    );
  }
}
