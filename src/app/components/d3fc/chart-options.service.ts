import * as d3 from 'd3';

export class ChartOptionsService {
  options: any;

  constructor() {
    this.options = {
      yTicks: 8,
      xTicks: 4,
      yAxisWidth: 55,
      yAxisLeftMargin: -3,
      xAxisHeight: 20,
      calloutLeftMargin: 8,
      calloutHeight: 16,
      dateFormat: d3.timeFormat('%b%e \'%y'),
      dayFormat: d3.timeFormat('%a %I:%M%p'),
      timeFormat: d3.timeFormat('%I:%M%p'),
      priceFormat: d3.format('.2f'),
      volumeFormat: function (value: number) {
        const prefix: any = d3.formatPrefix('.2f', 1e+6);
        return prefix(value);
      }
    };

    this.options.calloutWidth = this.options.yAxisWidth - this.options.calloutLeftMargin;
    this.options.calloutPathData = this.getCalloutPathData(this.options.calloutWidth, this.options.calloutHeight);
  }

  getDateFormat(range: string) {
    if (range === '1d') {
      return this.options.timeFormat;
    } else if (range === '5d') {
      return this.options.dayFormat;
    } else {
      return this.options.dateFormat;
    }
  }

  private getCalloutPathData(width: number, height: number): any[] {
    const height2: number = height / 2;
    return [
      [0, 0],
      [height2, -height2],
      [width, -height2],
      [width, height2],
      [height2, height2],
      [0, 0]
    ];
  }
}
