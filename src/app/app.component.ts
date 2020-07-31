import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscriptions } from './common/subscriptions';
import { HeaderStateService } from './services/state-services/header-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends Subscriptions implements OnInit {
  active: boolean;
  sidebar: boolean;
  private searchFromContent: boolean;

  constructor(private headerState: HeaderStateService) { 
    super();
  }

  ngOnInit(){
    const sub = this.headerState.preloader$.subscribe(
      preloader => {
        if (!preloader) {
          document.body.className += document.body.className==''? 'mp-loaded':' mp-loaded';
          //sub.unsubscribe();
        }
      }
    );
  }

  updateSearch(value: string) {
    this.headerState.changeSearch(value);
  }

  activateSearch(active: boolean) {
    this.headerState.changeSearchActive(active);
  }

  showSidebar() {
    this.headerState.changeSidebar(true);
  }

  toggleSearch(active: boolean) {
    this.headerState.changeSearchActive(active);
  }

  private searchActiveChange(searchActive: boolean) {
    this.active = searchActive;

    if (searchActive && !this.sidebar) {
      this.searchFromContent = true;
      this.headerState.changeSidebar(true);
    } else if (!searchActive && this.searchFromContent) {
      this.searchFromContent = false;
      if (this.sidebar) {
        this.headerState.changeSidebar(false);
      }
    }
  };
}
