import { AppComponent } from './app/app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { VehiclehomeComponent } from './components/vehiclehome/vehiclehome.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { DriverhomeComponent } from './components/driverhome/driverhome.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { register } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './components/admin/admin.module';
import { ProfileModule } from './components/user-profile/profile.module';
import { DriverOrdersComponent } from './components/driver-orders/driver-orders.component';
register();

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UsersignupComponent,
    VehiclehomeComponent,
    UserloginComponent,
    DriverhomeComponent,
    HeaderComponent,
    FooterComponent,
    DriverOrdersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AdminModule,
    ProfileModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideClientHydration(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
