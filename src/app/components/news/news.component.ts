import { Component, OnInit } from '@angular/core';
import { Notification, NotificationTypeEnum } from 'src/app/common/notification';
import { NewsDataInterface } from 'src/app/states/reducers/news-reducer';
import { NewsStateService } from 'src/app/services/state-services/news-state.service';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';
import { NewsApiService } from 'src/app/services/api-services/news-api.service';
import { environment } from 'src/environments/environment.base';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends Notification {
  news: NewsDataInterface[] = [];
  private stock: string;

  constructor(private newsState: NewsStateService,
              private dashboardState: DashboardStateService,
              private newsApiService: NewsApiService) {
    super(newsState, newsApiService);

    this.subscriptions.push(dashboardState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(newsState.data$.subscribe(
      news => this.updateNews(news)
    ));

    this.updateNews([]);
  }

  reload() {
    this.newsApiService.reload();
  }

  private updateStock(stock: string) {
    this.stock = stock;
    if (stock) {
      this.newsApiService.load(stock);
    }
  }

  private updateNews(data: NewsDataInterface[]) {
    if (data.length === 0) {
      if (this.stock) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noStock);
      }
    }

    this.news = data;
  }
}

