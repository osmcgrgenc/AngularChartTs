import { CommonModule } from "@angular/common";
import { ChartComponent } from "./chart.component";
import { CanvasHelperService } from "./services/canvas-helper.service";
import { ChartRendererService } from "./services/chart-renderer.service";
import { ChartUtilsService } from "./services/chart-utils.service";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ],
  providers: [
    ChartRendererService,
    CanvasHelperService,
    ChartUtilsService
  ]
})
export class ChartModule { } 