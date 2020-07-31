import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { EditComponent } from '../components/edit/edit.component';
import { SearchComponent } from '../components/search/search.component';
import { FavoriteListComponent } from '../components/favorite-list/favorite-list.component';
import { FavoritesHighlightService } from '../components/favorite-list/favorites-highlight.service';
import { EditService } from '../components/edit/edit.service';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    SidebarComponent,
    EditComponent,
    SearchComponent,
    FavoriteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    FavoritesHighlightService,
    EditService
  ]
})
export class SidebarModule { }
