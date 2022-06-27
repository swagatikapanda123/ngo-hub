import { RequestPageComponent } from './request-page/request-page.component';
import { ListNgoBySectorComponent } from './list-ngo-by-sector/list-ngo-by-sector.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterNgoComponent } from './register-ngo/register-ngo.component';
import { NgoslistComponent } from './ngoslist/ngoslist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'select-field',
    component: SelectFieldComponent,
  },
  {
    path: 'list-ngos/:location',
    component: NgoslistComponent,
  },

  {
    path: 'list-ngos-by-sector/:sector',
    component: ListNgoBySectorComponent,
  },

  {
    path: 'ngo/register',
    component: RegisterNgoComponent,
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },

  {
    path: 'ngo/login',
    component: LoginPageComponent,
  },

  {
    path: 'ngo-dashboard',
    component: NgoDashboardComponent,
  },

  {
    path: 'requisition-page/:id',
    component: RequestPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
