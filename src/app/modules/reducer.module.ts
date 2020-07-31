import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../common/state-service';
import { headerReducer } from 'src/app/states/reducers/header-reducer';
import { dashboardReducer } from 'src/app/states/reducers/dashboard-reducer';
import { favoritesReducer } from 'src/app/states/reducers/favorites-reducer';
import { sidebarReducer } from 'src/app/states/reducers/sidebar-reducer';
import { searchReducer } from 'src/app/states/reducers/search-reducer';
import { chartReducer } from 'src/app/states/reducers/chart-reducer';
import { newsReducer } from 'src/app/states/reducers/news-reducer';
import { infoReducer } from 'src/app/states/reducers/info-reducer';


const reducers: ActionReducerMap<AppState> = {
  header: headerReducer,
  dashboard: dashboardReducer,
  favorites: favoritesReducer,
  sidebar: sidebarReducer,
  search: searchReducer,
  chart: chartReducer,
  news: newsReducer,
  info: infoReducer
};

@NgModule({
  imports: [StoreModule.forRoot(reducers)],
  exports: [StoreModule]
})
export class ReducerModule { }
