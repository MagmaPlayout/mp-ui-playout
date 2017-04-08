import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutes } from './login/index';

import { DashboardRoutes } from './dashboard/index';
import { LoginComponent } from './login/index';

export const routes: Routes = [
  ...DashboardRoutes,
  { path: '**', component: LoginComponent },
   //{ path: '', redirectTo: '/webcam', pathMatch: 'full'},
   

];

@NgModule({
  imports: [RouterModule.forRoot(
      routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {}




