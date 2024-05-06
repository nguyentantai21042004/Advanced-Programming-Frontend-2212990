import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../../../../service/vehicle.service';
import { OrderDTO } from '../../../../dtos/order/order.dto';
import { Vehicle } from '../../../../models/vehicles/vehicle';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../models/users/user';
import { OrderSevice } from '../../../../service/order.service';

@Component({
  selector: 'app-add-order-admin',
  templateUrl: './add.order.admin.component.html',
  styleUrls: ['./add.order.admin.component.scss'],
})
export class AddOrderAdminComponent implements OnInit {
  @ViewChild('addOrderForm') addOrderForm!: NgForm;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private orderService: OrderSevice
  ) {}
  vehicleType: string = '';
  requestLicense: number = 0;
  vehicles: Vehicle[] = [];
  drivers: User[] = [];

  orderDTO: OrderDTO = {
    vehicleId: 0,
    userId: 0,
    startPlace: '',
    endPlace: '',
    startDate: new Date(),
    phoneNumber: '',
    status: '',
  };

  useCompanyResource() {
    this.findVehicle();
    this.findDriver();
  }

  findVehicle() {
    this.vehicleService.getVehiclesByType(this.vehicleType).subscribe({
      next: (response: any) => {
        this.vehicles = response.data.vehicles;
        this.requestLicense = this.vehicles[0].driverLicense;
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      },
    });
  }

  findDriver() {
    this.userService.getAvailableDriver(this.requestLicense).subscribe({
      next: (response: any) => {
        this.drivers = response.data.users;
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      },
    });
  }

  addOrder() {
    this.orderService.addOrder(this.orderDTO).subscribe({
      next: (response: any) => {
        alert('Success');
      },

      error: (error: any) => {
        console.error('Error fetching products', error);
      },
    });
  }
}
