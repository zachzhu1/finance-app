import { Injectable } from '@angular/core';
import { get } from 'lodash';

import { ResponseHandler } from '../../common/response-handler';
import { CoreApiService } from './core-api.service';
import { ChartStateService } from '../state-services/chart-state.service';
import { environment } from '../../../environments/environment';
import { ChartDataInterface } from 'src/app/states/reducers/chart-reducer';

@Injectable({
  providedIn: 'root'
})
export class ChartApiService extends ResponseHandler {
  private params: any = {};

  constructor(public apiService: CoreApiService, 
              public stateService: ChartStateService) {
    super(stateService);
  }

  load(stock: string, range: string, interval: string, env: any = environment) {
    this.params = {stock: stock, range: range, interval: interval};
    this.toggleLoader(true);

    let url: string = env.paths.charts.replace('$stock', stock);
    url = url.replace('$range', range);
    url = url.replace('$interval', interval);

    if (env.production) {
      this.apiService.post(env.paths.proxy, 'url=' + encodeURIComponent(url))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.apiService.get(url)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.params.stock, this.params.range, this.params.interval);
  }

  transform(rawData: any): ChartDataInterface[] {
    const data: ChartDataInterface[] = [];

    const chartData: any = get(rawData, 'chart.result[0]', {});
    if (chartData) {
      const items: any = {
        close: get(chartData, 'indicators.quote[0].close', []),
        high: get(chartData, 'indicators.quote[0].high', []),
        low: get(chartData, 'indicators.quote[0].low', []),
        open: get(chartData, 'indicators.quote[0].open', []),
        volume: get(chartData, 'indicators.quote[0].volume', []),
        dates: chartData.timestamp || []
      };
      let close: number;
      items.dates.forEach((value: number, index: number) => {
        close = get(items, 'close[' + index + ']', null);
        if (close) {
          data.push({
            timestamp: value,
            date: new Date(value * 1000),
            close: close,
            high: get(items, 'high[' + index + ']', null),
            low: get(items, 'low[' + index + ']', null),
            open: get(items, 'open[' + index + ']', null),
            volume: get(items, 'volume[' + index + ']', null),
          });
        }
      });
    }

    return data;
  }
}
