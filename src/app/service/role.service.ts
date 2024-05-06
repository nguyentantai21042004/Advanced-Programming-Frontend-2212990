import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiGetRoles = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) {}
  getRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiGetRoles);
  }
}
