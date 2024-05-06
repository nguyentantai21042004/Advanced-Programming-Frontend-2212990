import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './orders/order.admin.component';
import { VehicleAdminComponent } from './vehicle/vehicle.admin.component';
import { DriverAdminComponent } from './driver/driver.admin.component';
import { DetailOrderAdminComponent } from './orders/detail-order/detail.order.admin.component';
import { DetailVehicleAdminComponent } from './vehicle/detail-vehicle/detail.vehicle.admin.component';
import { AddVehicleAdminComponent } from './vehicle/add-vehicle/add.vehicle.admin.component';
import { MaintainVehicleAdminComponent } from './vehicle/maintain-vehicle/maintain.vehicle.admin.component';
import { AddOrderAdminComponent } from './orders/add-order/add.order.admin.component';
import { DetailDriverAdminComponent } from './driver/detail-driver/detail.driver.admin.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent,
      },
      {
        path: 'orders/add',
        component: AddOrderAdminComponent,
      },
      {
        path: 'orders/:id',
        component: DetailOrderAdminComponent,
      },
      {
        path: 'vehiclesAD',
        component: VehicleAdminComponent,
      },
      {
        path: 'vehiclesAD/add',
        component: AddVehicleAdminComponent,
      },
      {
        path: 'vehiclesAD/maintain/:id',
        component: MaintainVehicleAdminComponent,
      },
      {
        path: 'vehiclesAD/:id',
        component: DetailVehicleAdminComponent,
      },
      {
        path: 'drivers',
        component: DriverAdminComponent,
      },
      {
        path: 'drivers/:id',
        component: DetailDriverAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
