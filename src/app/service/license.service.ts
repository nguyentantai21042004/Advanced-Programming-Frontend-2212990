import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { License } from '../models/license';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { LicenseResponse } from '../responses/license/license.response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LicenseSerive {
  private apiLicense = `${environment.apiBaseUrl}/licenses`;

  constructor(private http: HttpClient) {}

  getLicenses(): Observable<LicenseResponse> {
    return this.http.get<LicenseResponse>(this.apiLicense);
  }
}
