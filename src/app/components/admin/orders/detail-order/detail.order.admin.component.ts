import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderSevice } from '../../../../service/order.service';
import { OrderResponse } from '../../../../responses/orders/order.response';

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail.order.admin.component.html',
  styleUrls: ['./detail.order.admin.component.scss'],
})
export class DetailOrderAdminComponent implements OnInit {
  orderId: number = 0;
  orderResponse: OrderResponse = {
    id: 0,
    vehicleId: 0,
    vehicleName: '',
    driverId: 0,
    driverName: '',
    driverPhone: '',
    startPlace: '',
    endPlace: '',
    startDate: new Date(),
    customerPhone: '',
    distance: 0,
    duration: 0,
    status: '',
    sumOfExpense: 0,
    profit: 0,
    vehiclePrice: 0,
    driverPrice: 0,
  };

  constructor(
    private orderService: OrderSevice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        this.orderResponse = response.data;
        this.orderResponse.vehicleId = response.data.vehicle.id;
        this.orderResponse.vehicleName = response.data.vehicle.name;

        this.orderResponse.driverId = response.data.user.id;
        this.orderResponse.driverName = response.data.user.fullName;
        this.orderResponse.driverPhone = response.data.user.phoneNumber;
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      },
    });
  }

  saveOrder(): void {
    this.orderService.updateOrder(this.orderId, this.orderResponse).subscribe({
      next: (response: any) => {
        alert('Order updated successfully:');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error: any) => {
        console.error('Error updating order:', error);
      },
    });
  }
}
