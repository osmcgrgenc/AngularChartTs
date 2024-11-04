import { Component } from '@angular/core';
import {exampleCharts} from './mock/chartData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chart-project';
  chartOptions = exampleCharts;
}
