import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Notification, NotificationTypeEnum } from 'src/app/common/notification';
import { StockData } from 'src/app/states/reducers/dashboard-reducer';
import { environment } from 'src/environments/environment.base';
import { ChartStateService } from 'src/app/services/state-services/chart-state.service';
import { ChartApiService } from 'src/app/services/api-services/chart-api.service';
import { HeaderStateService } from 'src/app/services/state-services/header-state.service';
import { localStorageAdapter } from 'src/app/common/utils';
import { ChartStateKeys, ChartDataInterface } from 'src/app/states/reducers/chart-reducer';
import { findIndex } from 'lodash';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent extends Notification {
  stockData: StockData = {};
  stock: string;
  ranges: any[] = environment.chartRanges;
  rangeId: string;
  favorite: boolean;
  private favorites: string[] = [];
  private range: any;

  constructor(public dashboardState: DashboardStateService,
              private chartState: ChartStateService,
              private chartApiService: ChartApiService,
              private headerState: HeaderStateService) {
    super(chartState, chartApiService);
    this.subscriptions.push(dashboardState.stockData$.subscribe(
      stockData => this.stockData = stockData
    ));

    this.subscriptions.push(dashboardState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(dashboardState.favorites$.subscribe(
      favorites => this.updateFavorites(favorites)
    ));

    this.subscriptions.push(chartState.range$.subscribe(
      range => this.updateRange(range)
    ));

    this.subscriptions.push(chartState.data$.subscribe(
      data => this.validateChartData(data)
    ));
  }

  tabChanged(id: string) {
    if (this.ranges.findIndex(x => x.id === id)!=-1) {
      this.chartState.changeRange(id);
    }
  }

  toggleFavorite(favorite: boolean) {
    if (favorite) {
      this.dashboardState.addFavorite(this.stock);
    } else {
      this.dashboardState.deleteFavorites([this.stock]);
    }
  }

  private updateFavorites(favorites: string[]) {
    this.favorites = favorites;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
  }

  private updateStock(stock: string) {
    this.stock = stock;
    this.favorite = this.favorites.indexOf(this.stock) !== -1;
    if (stock) {
      this.loadChartData();
    } else {
      this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
    }
  }

  private updateRange(range: string) {
    localStorageAdapter.setItem(ChartStateKeys.Range, range);
    let rangeIndex: number = findIndex(this.ranges, ['id', range]);
    if (rangeIndex === -1) {
      rangeIndex = 0;
    }

    setTimeout(() => {
      this.rangeId = this.ranges[rangeIndex].id;
      this.range = this.ranges[rangeIndex];
      this.loadChartData();
    }, 0);
  }

  private loadChartData() {
    if (this.stock && this.range) {
      this.chartApiService.load(this.stock, this.range.id, this.range.interval);
    }
  }

  private validateChartData(data: ChartDataInterface[]) {
    if (data.length === 0) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
      }
    }

    this.headerState.changePreloader(false);
  }
}
