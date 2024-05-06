import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Vehicle } from '../models/vehicles/vehicle';
import { environment } from '../environments/environment';
import { VehicleDTO } from '../dtos/vehicle/vehicle.dto';
import { ApiResponse } from '../responses/api.response';
import { VehicleUpdateDTO } from '../dtos/vehicle/vehicle.update.dto';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiVehicles = `${environment.apiBaseUrl}/vehicles`;
  private apiConfig = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllVehicles(
    keyword: string,
    vehicle_type: string,
    page: number,
    limit: number
  ): Observable<Vehicle[]> {
    const params = {
      keyword: keyword,
      vehicle_type: vehicle_type,
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<Vehicle[]>(this.apiVehicles, { params });
  }

  getVehiclesByType(vehicle_type: string): Observable<Vehicle[]> {
    const url = `${this.apiVehicles}/type`;
    const params = {
      vehicle_type: vehicle_type,
    };
    return this.http.get<Vehicle[]>(url, { params });
  }

  getVehicleById(id: number): Observable<Vehicle> {
    const url = `${this.apiVehicles}/${id}`;
    return this.http.get<Vehicle>(url);
  }

  addVehicle(vehicleData: VehicleDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.apiVehicles,
      vehicleData,
      this.apiConfig
    );
  }

  updateVehicle(
    id: number,
    vehicleData: VehicleUpdateDTO
  ): Observable<Vehicle> {
    const url = `${this.apiVehicles}/${id}`;
    return this.http.put<Vehicle>(url, vehicleData, this.apiConfig);
  }

  uploadImage(vehicleId: number, files: File[]): Observable<any> {
    const formData = new FormData();

    if (!files || files.length === 0) {
      console.error('No files to upload.');
      return EMPTY;
    }

    const file = files[0];
    formData.append('files', file);

    const url = `${this.apiVehicles}/uploads/${vehicleId}`;

    return this.http.post(url, formData);
  }

  deleteVehcile(vehicleId: number): Observable<any> {
    const url = `${this.apiVehicles}/${vehicleId}`;
    return this.http.delete(url);
  }
}
