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

  dataConverter = (liste: any[], x_kolon: string, y_kolon: string) : [number, any][] => {
    return liste.map((eleman)=>{return [eleman[x_kolon],eleman[y_kolon]]});
  }
}
