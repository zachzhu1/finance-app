import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContentModule } from './content.module';

import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SidebarModule } from './sidebar.module';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ContentModule,
    SidebarModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
