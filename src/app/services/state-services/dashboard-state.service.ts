import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { StockData } from 'src/app/states/reducers/dashboard-reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/common/state-service';
import * as DashboardActions from '../../states/actions/dashboard-actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  stockData$: Observable<StockData>;
  stock$: Observable<string>;
  favorites$: Observable<string[]>;
  highlights$: Observable<any>;

  constructor(protected store$: Store<AppState>) {
    this.stockData$ = store$.pipe(
      map((state: AppState) => state.dashboard.stockData), 
      distinctUntilChanged());

    this.stock$ = store$.pipe(
      map((state: AppState) => state.dashboard.stock), 
      distinctUntilChanged());

    this.favorites$ = store$.pipe(
      map((state: AppState) => state.dashboard.favorites), 
      distinctUntilChanged());;

    this.highlights$ = store$.pipe(
      map((state: AppState) => state.dashboard.highlights), 
      distinctUntilChanged());;
  }

  changeStockData(data: StockData) {
    this.store$.dispatch(DashboardActions.changeStockData({data:data}));
  }

  changeStock(stock: string) {
    this.store$.dispatch(DashboardActions.changeStock({stock:stock}));
  }

  addFavorite(favorite: string) {
    this.store$.dispatch(DashboardActions.addFavorite({favorite:favorite}));
  }

  deleteFavorites(favorites: string[]) {
    this.store$.dispatch(DashboardActions.deleteFavorites({favorites:favorites}));
  }

  changeHighlights(highlights: any) {
    this.store$.dispatch(DashboardActions.changeHighlights({highlights:highlights}));
  }
}
