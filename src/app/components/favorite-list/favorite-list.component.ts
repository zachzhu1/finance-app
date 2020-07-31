import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Notification, NotificationTypeEnum } from 'src/app/common/notification';
import { StockData } from 'src/app/states/reducers/dashboard-reducer';
import { SidebarTypeEnum } from 'src/app/states/reducers/sidebar-reducer';
import { FavoritesStateKeys } from 'src/app/states/reducers/favorites-reducer';
import { localStorageAdapter } from 'src/app/common/utils';
import { Router } from '@angular/router';
import { find } from 'lodash';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';
import { FavoritesStateService } from 'src/app/services/state-services/favorites-state.service';
import { SidebarStateService } from 'src/app/services/state-services/sidebar-state.service';
import { HeaderStateService } from 'src/app/services/state-services/header-state.service';
import { FavoriteListApiService } from 'src/app/services/api-services/favorite-list-api.service';
import { FavoritesHighlightService } from './favorites-highlight.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent extends Notification implements OnDestroy {
  //@ViewChild('mdlMenu') mdlMenu: ElementRef;
  favoritesData: StockData[] = [];
  stock: string;
  pillType: string = PillEnum[PillEnum.change];
  private pillIndex: number = PillEnum.change;
  private sidebar: boolean;
  private refreshTimeout: any;
  private lastLoadedData: any = {};
  private favorites: string[] = [];
  private data: StockData[] = [];

  constructor(public dashboardState: DashboardStateService,
              public favoritesState: FavoritesStateService,
              private favoritesApiService: FavoriteListApiService,
              private favoritesHighlightService: FavoritesHighlightService,
              private sidebarState: SidebarStateService,
              private headerState: HeaderStateService,
              private router: Router) {
    super(favoritesState, favoritesApiService);

    this.subscriptions.push(dashboardState.favorites$.subscribe(
      favorites => {
        this.favorites = favorites;
        if(this.favorites.length>0 && !this.stock){
          this.stock = this.favorites[0];
          //this.select(this.stock);
        }
      }
    ));

    this.subscriptions.push(dashboardState.stock$.subscribe(
      stock => this.changeStock(stock)
    ));

    this.subscriptions.push(favoritesState.data$.subscribe(
      data => this.updateFavorites(data)
    ));

    this.subscriptions.push(headerState.sidebar$.subscribe(
      sidebar => this.sidebar = sidebar
    ));

    this.subscriptions.push(favoritesState.order$.subscribe(
      order => localStorageAdapter.setItem(FavoritesStateKeys.Order, order)
    ));

    favoritesState.sortData();
  }

  add() {
    this.headerState.changeSearchActive(true);
  }

  edit() {
    this.sidebarState.changeType(SidebarTypeEnum.Edit);
  }

  reload() {
    this.cancelTimeout();
    this.favoritesApiService.reload();
  }

  select(stock: string) {
    if (this.sidebar) {
      this.headerState.changeSidebar(false);
    }

    this.router.navigate(['/dashboard', stock]);
  }

  togglePill() {
    this.pillIndex++;
    if (this.pillIndex > PillEnum.percentage) {
      this.pillIndex = PillEnum.change;
    }

    this.pillType = PillEnum[this.pillIndex];
  }

  notificationAction(type: string) {
    super.notificationAction(type);
    if (type === FavoriteNotificationActions.Add) {
      this.add();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.cancelTimeout();
  }

  private updateFavorites(data: StockData[]) {
    this.data = data;
    this.favoritesData = data.filter((item: StockData) => {
      return this.favorites.indexOf(item.symbol) !== -1;
    });
    this.dashboardState.changeHighlights(this.favoritesHighlightService.getHighlights(data, this.lastLoadedData));
    this.lastLoadedData = this.favoritesHighlightService.getLastLoadedData(data);

    setTimeout(() => {
      this.dashboardState.changeHighlights({});
    }, 500);

    this.dashboardState.changeStockData(find(data, ['symbol', this.stock]) || {});
    if (this.favoritesData.length === 0) {
      this.updateNotification(
        NotificationTypeEnum.Notification,
        'Your favorites is empty!',
        {
          icon: 'add',
          text: 'Add symbol',
          action: FavoriteNotificationActions.Add
        });
    } else {
      this.startRefresh();
    }
  }

  private changeStock(stock: string) {
    this.stock = stock;
    this.dashboardState.changeStockData(find(this.data, ['symbol', stock]) || {});
  }

  private cancelTimeout() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

  private startRefresh() {
    this.cancelTimeout();
    this.refreshTimeout = setTimeout(() => {
      this.favoritesApiService.disableLoader = true;
      this.favoritesApiService.reload();
    }, 10000);
  }
}

enum PillEnum {
  change,
  percentage
}

export class FavoriteNotificationActions {
  static Add = 'add';
}
