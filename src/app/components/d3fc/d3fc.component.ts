import { Component, OnInit, ViewEncapsulation, AfterViewInit, HostListener } from '@angular/core';
import { ChartOptionsService } from './chart-options.service';
import { Subscriptions } from 'src/app/common/subscriptions';
import { ChartDataInterface } from 'src/app/states/reducers/chart-reducer';
import { ChartStateService } from 'src/app/services/state-services/chart-state.service';
import * as d3 from 'd3';

const fc = require('d3fc');

@Component({
  selector: 'app-d3fc',
  templateUrl: './d3fc.component.html',
  styleUrls: ['./d3fc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ChartOptionsService
  ]
})
export class D3fcComponent extends Subscriptions implements AfterViewInit {
  //@ViewChild('svg') svg: ElementRef;
  smallView = false;
  private data: ChartDataInterface[];
  private container: any;
  private chart: any;
  private range: string;
  private windowWidth: number = window.innerWidth;

  constructor(public chartState: ChartStateService,
              private chartOptionsService: ChartOptionsService) {
    super();

    this.subscriptions.push(chartState.range$.subscribe(
      range => this.range = range
    ));

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    this.updateSettings();
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.chartState.data$.subscribe(
      data => this.init(data)
    ));

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize(event.currentTarget.innerWidth);
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    this.resize(event.currentTarget.innerWidth);
  }

  private resize(windowWidth: number) {
    this.windowWidth = windowWidth;
    if (this.data) {
      this.redraw(this.data, this.container, this.chart);
    }
  }

  private init(data: ChartDataInterface[]) {
    //console.log(data);
    if (data && data.length > 0) {
      this.data = data;
      this.container = d3.select("#chart");
      //this.chartVolumeService.init(data, this.container);
      this.render(data);
      this.redraw(data, this.container, this.chart);
    }
  }

  private render(data: ChartDataInterface[]) {
    const xScale = d3
      .scaleTime()
      .domain(fc.extentTime().accessors([d => d.date])(data));

    const yScale = d3
        .scaleLinear()
        .domain(fc.extentLinear().accessors([d => d.high, d => d.low])(data));

    const gridlines = fc.annotationSvgGridline();
    const candlestick = fc.seriesSvgCandlestick();
    const lowLine = fc
            .seriesSvgLine()
            .crossValue(d => d.date)
            .mainValue(d => d.low);
    const multi = fc.seriesSvgMulti().series([gridlines, candlestick, lowLine]);

    const chart = fc.chartCartesian(xScale, yScale)
      .xTickFormat(this.chartOptionsService.getDateFormat(this.range))
      .yTickFormat(this.chartOptionsService.options.priceFormat)
      //.yTicks(this.chartOptionsService.options.yTicks)
      //.yNice(this.chartOptionsService.options.yTicks)
      //.yOrient('right')
      //.yTickSize(this.chartOptionsService.options.yAxisWidth, 0)
      //.xTickSize(this.chartOptionsService.options.xAxisHeight)
      //.xTicks(this.chartOptionsService.options.xTicks)
      .svgPlotArea(multi);

      this.container
        .datum(data)
        .call(chart)
  }

  private redraw(data: ChartDataInterface[], container: any, chart: any) {
    const render: boolean = this.updateSettings();
    if (render) {
      this.render(data);
    }

    //this.chartVolumeService.render(data, chart['xScale']);
    this.chartState.changePoint(data[data.length - 1]);
    this.applyPostRenderChanges();
  }

  private updateSettings() {
    let render = false;
    if (this.windowWidth < 420) {
      if (!this.smallView) {
        this.smallView = true;
        this.chartOptionsService.options.yAxisWidth = 0;
        this.chartOptionsService.options.yAxisLeftMargin = 3;
        this.chartOptionsService.options.xTicks = 3;
        this.chartOptionsService.options.yTicks = 3;
        render = true;
      }
    } else if (this.smallView) {
      this.smallView = false;
      this.chartOptionsService.options.yAxisWidth = 55;
      this.chartOptionsService.options.yAxisLeftMargin = -3;
      this.chartOptionsService.options.xTicks = 4;
      this.chartOptionsService.options.yTicks = 8;
      render = true;
    }

    return render;
  }

  private applyPostRenderChanges() {
    d3.selectAll('.y-axis text')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(' + this.chartOptionsService.options.yAxisLeftMargin + ', -8)');

    d3.selectAll('.x-axis text')
      .attr('dy', undefined)
      .style('text-anchor', 'start')
      .style('dominant-baseline', 'central')
      .attr('transform', 'translate(3, -' + (this.chartOptionsService.options.xAxisHeight / 2 + 3) + ' )');

    if (!this.smallView) {
      d3.select('.plot-area')['moveToFront()']
    }
  }
}
