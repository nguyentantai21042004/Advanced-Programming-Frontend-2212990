import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './orders/order.admin.component';
import { VehicleAdminComponent } from './vehicle/vehicle.admin.component';
import { DriverAdminComponent } from './driver/driver.admin.component';
import { DetailVehicleAdminComponent } from './vehicle/detail-vehicle/detail.vehicle.admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddVehicleAdminComponent } from './vehicle/add-vehicle/add.vehicle.admin.component';
import { MaintainVehicleAdminComponent } from './vehicle/maintain-vehicle/maintain.vehicle.admin.component';
import { DetailOrderAdminComponent } from './orders/detail-order/detail.order.admin.component';
import { AddOrderAdminComponent } from './orders/add-order/add.order.admin.component';
import { DetailDriverAdminComponent } from './driver/detail-driver/detail.driver.admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,
    VehicleAdminComponent,
    DetailVehicleAdminComponent,
    AddVehicleAdminComponent,
    MaintainVehicleAdminComponent,
    DetailOrderAdminComponent,
    AddOrderAdminComponent,
    DriverAdminComponent,
    DetailDriverAdminComponent
  ],
  imports: [
    AdminRoutingModule, 
    CommonModule,
    FormsModule,
    NgbModule 
  ],
})
export class AdminModule {}
