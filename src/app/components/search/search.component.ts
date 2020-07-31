import { Component } from '@angular/core';
import { Notification, NotificationTypeEnum } from 'src/app/common/notification';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StockData } from 'src/app/states/reducers/dashboard-reducer';
import { SidebarTypeEnum } from 'src/app/states/reducers/sidebar-reducer';
import { SearchStateService } from 'src/app/services/state-services/search-state.service'
import { SidebarStateService } from 'src/app/services/state-services/sidebar-state.service';
import { FavoritesStateService } from 'src/app/services/state-services/favorites-state.service';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';
import { HeaderStateService } from 'src/app/services/state-services/header-state.service';
import { SearchApiService } from 'src/app/services/api-services/search-api.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent extends Notification {
  stocks: StockData[] = [];
  notification: string;
  notificationType: NotificationTypeEnum;
  private search: string;
  private order: string[];

  constructor(private searchState: SearchStateService,
              private sidebarState: SidebarStateService,
              private favoritesState: FavoritesStateService,
              private dashboardState: DashboardStateService,
              private searchApiService: SearchApiService,
              private headerState: HeaderStateService,
              private router: Router) {
    super(searchState, searchApiService);

    this.subscriptions.push(searchState.data$.subscribe(
      data => this.updateStocks(data)
    ));

    this.subscriptions.push(favoritesState.order$.subscribe(
      order => this.order = order
    ));

    this.subscriptions.push(headerState.search$.subscribe(
      search => this.updateSearch(search)
    ));

    this.updateStocks([]);
  }

  add(stock: StockData) {
    this.order.unshift(stock.symbol);
    this.favoritesState.changeOrder(this.order);
    this.dashboardState.addFavorite(stock.symbol);
    this.sidebarState.changeType(SidebarTypeEnum.List);
    this.router.navigate(['/dashboard', stock.symbol]);
  }

  private updateSearch(value: string) {
    this.search = value;
    if (value) {
      this.searchApiService.load(value);
    } else {
      this.updateStocks([]);
    }
  }

  private updateStocks(data: StockData[]) {
    if (data.length === 0) {
      if (this.search) {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.noData);
      } else {
        this.updateNotification(NotificationTypeEnum.Notification, environment.notifications.search);
      }
    }

    this.stocks = data;
  }
}
