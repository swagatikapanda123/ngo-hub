import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { NgoslistComponent } from './ngoslist/ngoslist.component';
import { RegisterNgoComponent } from './register-ngo/register-ngo.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { ListNgoBySectorComponent } from './list-ngo-by-sector/list-ngo-by-sector.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import { UserDashbaordComponent } from './user-dashbaord/user-dashbaord.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SelectFieldComponent,
    NgoslistComponent,
    RegisterNgoComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginPageComponent,
    NgoDashboardComponent,
    ListNgoBySectorComponent,
    RequestPageComponent,
    HomeComponent,
    UserDashbaordComponent,
    RegistrationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlickCarouselModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
