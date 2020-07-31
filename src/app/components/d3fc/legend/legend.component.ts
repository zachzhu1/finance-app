import { Component, OnInit } from '@angular/core';
import { Subscriptions } from 'src/app/common/subscriptions';
import { ChartDataInterface } from 'src/app/states/reducers/chart-reducer';
import { ChartStateService } from 'src/app/services/state-services/chart-state.service';
import { ChartOptionsService } from '../chart-options.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent extends Subscriptions {
  items: LegendInterface[] = [];

  constructor(private chartOptionsService: ChartOptionsService,
              private chartState: ChartStateService) {
    super();
    this.subscriptions.push(this.chartState.point$
      .subscribe(
        data => this.updateItems(data)
      ));
  }

  private updateItems(data: ChartDataInterface) {
    if (data) {
      this.items = [
        {label: 'Open', value: this.chartOptionsService.options.priceFormat(data.open)},
        {label: 'Close', value: this.chartOptionsService.options.priceFormat(data.close)},
        {label: 'Low', value: this.chartOptionsService.options.priceFormat(data.low)},
        {label: 'High', value: this.chartOptionsService.options.priceFormat(data.high)},
        {label: 'Vol', value: this.chartOptionsService.options.volumeFormat(data.volume)}
      ];
    } else {
      this.items = [];
    }
  }
}

export interface LegendInterface {
  label?: string;
  value?: string;
}

