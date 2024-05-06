import { Component, OnInit } from '@angular/core';
import { OrderSevice } from '../../service/order.service';
import { OrderResponse } from '../../responses/orders/order.response';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-driver-orders',
  templateUrl: './driver-orders.component.html',
  styleUrls: ['./driver-orders.component.scss'],
})
export class DriverOrdersComponent implements OnInit {
  userResponse: UserResponse | undefined;
  userId: number | undefined;

  orderResponses: OrderResponse[] = [];

  constructor(
    private orderService: OrderSevice,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userResponse =
      this.userService.getUserResponseFromLocalStorage() ?? undefined;
    this.userId = this.userResponse?.id;
    this.getOrdersById();
  }

  getOrdersById() {
    if (this.userId !== undefined) {
      this.orderService.getOrdersByUserId(this.userId).subscribe({
        next: (response: any) => {
          this.orderResponses = response.responses;
        },
        complete: () => {},
        error: (error: any) => {
          console.error('Error fetching products', error);
        },
      });
    }
  }
}
