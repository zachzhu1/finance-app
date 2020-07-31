import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import * as SidebarActions  from '../../states/actions/sidebar-actions';
import { SidebarTypeEnum } from 'src/app/states/reducers/sidebar-reducer';
import { AppState } from 'src/app/common/state-service';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  type$: Observable<SidebarTypeEnum>;

  constructor(public store$: Store<AppState>) {
    this.type$ = store$.pipe(      
      map((state: AppState) => state.sidebar.sidebarType), 
      distinctUntilChanged());

  }

  changeType(sidebarType: SidebarTypeEnum) {
    this.store$.dispatch(SidebarActions.changeType({sidebarType: sidebarType}));
  }
}