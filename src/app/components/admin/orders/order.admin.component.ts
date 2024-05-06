import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderSevice } from '../../../service/order.service';
import { ApiResponse } from '../../../responses/api.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order.admin.component.html',
  styleUrls: ['./order.admin.component.scss'],
})
export class OrderAdminComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private orderService: OrderSevice, private router: Router) {}

  ngOnInit(): void {
    this.getAllOrders(this.currentPage, this.itemsPerPage);
  }

  getAllOrders(page: number, limit: number) {
    this.orderService.getAllOrders(page, limit).subscribe({
      next: (response: ApiResponse) => {
        this.orders = response.data.orders;
        this.totalPages = response.data.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      error: (error: any) => {
        console.error('Error fetching orders', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.getAllOrders(this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  deleteOrder(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this order?'
    );
    if (confirmation) {
      this.orderService.deleteOrder(id).subscribe({
        next: (response: any) => {
          alert('Successfully deleted the order with ID ' + id);
        },
        error: (error: any) => {
          console.error('Error deleting order', error);
        },
      });
    }
  }

  viewDetails(order: Order) {
    this.router.navigate(['/admin/orders', order.id]);
  }

  addNewOrder() {
    this.router.navigate(['/admin/orders/add']);
  }
}
