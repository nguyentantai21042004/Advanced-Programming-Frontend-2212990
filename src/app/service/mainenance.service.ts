import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Vehicle } from '../models/vehicles/vehicle';
import { environment } from '../environments/environment';
import { VehicleDTO } from '../dtos/vehicle/vehicle.dto';
import { ApiResponse } from '../responses/api.response';
import { VehicleUpdateDTO } from '../dtos/vehicle/vehicle.update.dto';
import { MaintenanceDTO } from '../dtos/maintenance/maintenance.dto';
import { UpdateMaintenanceDTO } from '../dtos/maintenance/update.maintenancy.dto';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiMaintenances = `${environment.apiBaseUrl}/maintenances`;
  private apiConfig = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    }),
  };

  constructor(private http: HttpClient) {}

  addMaintenance(maintainDTO: MaintenanceDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.apiMaintenances,
      maintainDTO,
      this.apiConfig
    );
  }

  getMaintenancesByVehicle(
    id: number,
    page: number,
    limit: number
  ): Observable<ApiResponse> {
    const url = `${this.apiMaintenances}/${id}`;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<ApiResponse>(url, { params });
  }

  uploadImage(vehicleId: number, files: File[]): Observable<any> {
    const formData = new FormData();

    if (!files || files.length === 0) {
      console.error('No files to upload.');
      return EMPTY;
    }

    const file = files[0];
    formData.append('files', file);

    const url = `${this.apiMaintenances}/uploads/${vehicleId}`;

    return this.http.post(url, formData);
  }

  updateMaintenance(
    id: number,
    updateMaintenanceDTO: UpdateMaintenanceDTO
  ): Observable<ApiResponse> {
    const url = `${this.apiMaintenances}/${id}`;
    return this.http.put<ApiResponse>(
      url,
      updateMaintenanceDTO,
      this.apiConfig
    );
  }

  delete(Id: number): Observable<any> {
    const url = `${this.apiMaintenances}/${Id}`;
    return this.http.delete(url);
  }
}
