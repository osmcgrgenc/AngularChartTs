import { Component } from '@angular/core';
import { ChartOptions } from './chart/models/chart.models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chart-project';
  chartOptions: ChartOptions = {
    xAxis: { title: 'Time', min: 0, max: 10, ticks: 1 },
    yAxis: { title: 'Value', min: 0, max: 100, ticks: 5 },
    lines: [
      { data: [[1, 10], [2, 30], [4, 50], [6, 70], [8, 90]], color: 'steelblue' }
    ],
    dots: [
      { data: [[1, 10], [2, 30], [4, 50], [6, 70], [8, 90]], color: 'steelblue' }
    ]
  };

  dataConverter = (liste: any[], x_kolon: string, y_kolon: string) : [number, any][] => {
    return liste.map((eleman)=>{return [eleman[x_kolon],eleman[y_kolon]]});
  }
}
