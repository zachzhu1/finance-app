import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'dashboard', 
    loadChildren: () => import('./modules/dashboard.module')
      .then(m => m.DashboardModule) },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/dashboard', pathMatch:'full' },
  { path: '**',     
    loadChildren: () => import('./modules/dashboard.module')
      .then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
