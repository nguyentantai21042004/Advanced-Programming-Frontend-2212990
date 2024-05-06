import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomepageComponent } from './components/homepage/homepage.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { VehiclehomeComponent } from './components/vehiclehome/vehiclehome.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DriverhomeComponent } from './components/driverhome/driverhome.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardFn } from './guards/auth.guard';
import { AdminGuardFn } from './guards/admin.guard';
import { DriverOrdersComponent } from './components/driver-orders/driver-orders.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'register', component: UsersignupComponent },
  { path: 'vehicles', component: VehiclehomeComponent },
  { path: 'drivers', component: DriverhomeComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardFn],
  },
  {
    path: 'driverOrders',
    component: DriverOrdersComponent,
    canActivate: [AuthGuardFn],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardFn],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
