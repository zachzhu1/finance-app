import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscriptions } from 'src/app/common/subscriptions';
import { StockData } from 'src/app/states/reducers/dashboard-reducer';
import { SidebarTypeEnum } from 'src/app/states/reducers/sidebar-reducer';
import { environment } from '../../../environments/environment';
import { FavoritesStateService } from 'src/app/services/state-services/favorites-state.service';
import { SidebarStateService } from 'src/app/services/state-services/sidebar-state.service';
import { HeaderStateService } from 'src/app/services/state-services/header-state.service';
import { EditService } from './edit.service';
import { DashboardStateService } from 'src/app/services/state-services/dashboard-state.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends Subscriptions implements OnDestroy {
  @ViewChild('list') list: ElementRef;
  favoritesData: StockData[] = [];
  favorites: string[] = [];
  notification: string;
  selected: string;
  deleted: string[] = [];
  //dragName = 'editDrag';
  private windowClickListener: Function;

  constructor(private favoritesState: FavoritesStateService,
              private sidebarState: SidebarStateService,
              private headerState: HeaderStateService,
              private dashboardState: DashboardStateService,
              private editService: EditService,
              private renderer: Renderer2) {
    super();
    this.subscriptions.push(dashboardState.favorites$.subscribe(
      favorites => this.favorites = favorites
    ));

    this.subscriptions.push(favoritesState.data$.subscribe(
      data => this.favoritesData = data.filter((item: StockData) => {
        return this.favorites.indexOf(item.symbol) !== -1;
      })
    ));

    //dragulaService.createGroup(this.dragName, editService.getDragOptions());
  }

  showDelete(symbol: string, event: Event) {
    event.stopPropagation();
    this.selected = symbol;
    this.windowClickListener = this.renderer.listen('window', 'click',
      () => {
        this.selected = null;
        this.destroyListener();
      });
  }

  close() {
    this.closeScreen(SidebarTypeEnum.List);
  }

  add() {
    this.closeScreen(SidebarTypeEnum.Add);
  }

  delete(symbol: string, event: Event) {
    event.stopPropagation();
    this.deleted.push(symbol);
    if (this.deleted.length === this.favoritesData.length) {
      this.notification = environment.notifications.noFavorites;
    }
    this.destroyListener();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyListener();
    //this.dragulaService.destroy(this.dragName);
  }

  private destroyListener() {
    if (this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }

  private closeScreen(type: SidebarTypeEnum) {
    this.favoritesState.changeOrder(this.editService.getOrder(this.list, this.deleted));

    if (this.deleted.length > 0) {
      this.dashboardState.deleteFavorites(this.deleted);
    }

    if (type === SidebarTypeEnum.Add) {
      this.headerState.changeSearchActive(true);
    } else {
      this.sidebarState.changeType(type);
    }
  }
}
