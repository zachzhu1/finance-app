import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../components/chart/chart.component';
import { InfoComponent } from '../components/info/info.component';
import { NewsComponent } from '../components/news/news.component';
import { ContentComponent } from '../components/content/content.component';
import { SharedModule } from './shared.module';
import { RangeComponent } from '../components/info/range/range.component';
import { InfoService } from '../components/info/info.service';
import { D3fcComponent } from '../components/d3fc/d3fc.component';
import { LegendComponent } from '../components/d3fc/legend/legend.component';

@NgModule({
  declarations: [
    ContentComponent,
    RangeComponent,
    D3fcComponent,
    LegendComponent,
    ChartComponent,
    InfoComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ContentComponent//the wrapper component must be exported
  ],
  providers:[
    InfoService
  ]
})
export class ContentModule { }
