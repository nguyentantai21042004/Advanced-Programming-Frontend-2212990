import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderDTO } from '../dtos/order/order.dto';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { ApiResponse } from '../responses/api.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { OrderUpdateDTO } from '../dtos/order/order.update';

@Injectable({
  providedIn: 'root',
})
export class OrderSevice {
  private apiOrder = `${environment.apiBaseUrl}/orders`;

  private apiConfig = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    }),
  };

  constructor(private http: HttpClient) {}

  getOrderById(id: number): Observable<ApiResponse> {
    const url = `${this.apiOrder}/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  getAllOrders(page: number, limit: number): Observable<ApiResponse> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<ApiResponse>(this.apiOrder, { params });
  }

  addOrder(orderDTO: OrderDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiOrder, orderDTO, this.apiConfig);
  }

  updateOrder(
    id: number,
    updateOrder: OrderUpdateDTO
  ): Observable<ApiResponse> {
    const url = `${this.apiOrder}/${id}`;
    return this.http.put<ApiResponse>(url, updateOrder, this.apiConfig);
  }

  deleteOrder(orderId: number) {
    const url = `${this.apiOrder}/${orderId}`;
    return this.http.delete(url);
  }

  getOrdersByUserId(userId: number): Observable<ApiResponse> {
    const url = `${this.apiOrder}/byDriver/${userId}`;
    return this.http.get<ApiResponse>(url);
  }
}
