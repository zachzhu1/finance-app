import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscriptions } from 'src/app/common/subscriptions';
import { Subject } from 'rxjs';
import { SidebarTypeEnum } from 'src/app/states/reducers/sidebar-reducer';
import { localStorageAdapter } from 'src/app/common/utils';
import { takeUntil, pluck, distinctUntilChanged } from 'rxjs/operators';
import { SidebarStateService } from 'src/app/services/state-services/sidebar-state.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteListApiService } from 'src/app/services/api-services/favorite-list-api.service';
import { HeaderStateService } from 'src/app/services/state-services/header-state.service';
import { DashboardStateKeys } from 'src/app/states/reducers/dashboard-reducer';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends Subscriptions implements OnDestroy {
  private ngOnDestroy$ = new Subject<boolean>();
  private favorites: string[] = [];
  private stock: string;

  constructor(public sidebarState: SidebarStateService,
              private route: ActivatedRoute,
              private favoritesApiService: FavoriteListApiService,
              private dashboardState: DashboardStateService,
              private headerState: HeaderStateService) {
    super();
    this.subscriptions.push(dashboardState.favorites$.subscribe(
      favorites => this.updateFavorites(favorites)
    ));

    this.subscriptions.push(dashboardState.stock$.subscribe(
      stock => this.updateStock(stock)
    ));

    this.subscriptions.push(headerState.searchActive$.subscribe(
      searchActive => searchActive ? sidebarState.changeType(SidebarTypeEnum.Add) : sidebarState.changeType(SidebarTypeEnum.List)
    ));

    route.params.pipe(
      takeUntil(this.ngOnDestroy$),
      pluck('id'),
      distinctUntilChanged()
    ).subscribe((id: string) => {
      dashboardState.changeStock(id)
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.ngOnDestroy$.next(true);
  }

  private updateFavorites(favorites: string[]) {
    localStorageAdapter.setItem(DashboardStateKeys.Favorites, favorites);
    this.favorites = favorites.slice();
    this.loadFavoritesData();
  }

  private updateStock(stock: string) {
    this.stock = stock;
    if (this.favorites.indexOf(this.stock) === -1) {
      this.loadFavoritesData();
    }
  }

  private loadFavoritesData() {
    if (this.stock) {
      if (this.favorites.indexOf(this.stock) === -1) {
        this.favorites.push(this.stock);
      }
    }
    this.favoritesApiService.load(this.favorites);
  }
}

