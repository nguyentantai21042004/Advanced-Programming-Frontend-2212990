import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dtos';
import { LoginDTO } from '../dtos/user/login.dtos';
import { HttpUtilService } from './http.util.service';
import { ApiResponse } from '../responses/api.response';
import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserResponse } from '../responses/user/user.response';
import { environment } from '../environments/environment';
import { User } from '../models/users/user';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { DriverResponse } from '../responses/user/driver.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiDriverByLicense = `${environment.apiBaseUrl}/users/licensesId`;
  private apiAllDrivers = `${environment.apiBaseUrl}/users/drivers`;

  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  localStorage?: Storage;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
  }

  register(registerDTO: RegisterDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.apiRegister,
      registerDTO,
      this.apiConfig
    );
  }

  login(loginDTO: LoginDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiLogin, loginDTO, this.apiConfig);
  }

  getAvailableDriver(licenseId: number): Observable<UserResponse[]> {
    const params = {
      licenseId: licenseId,
    };

    return this.http.get<UserResponse[]>(this.apiDriverByLicense, { params });
  }

  getUsersByLicenseId(licenseId: number): Observable<User[]> {
    const url = `${this.apiDriverByLicense}/${licenseId}`;
    return this.http.get<User[]>(url);
  }

  getAllDrivers(page: number, limit: number): Observable<User[]> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
    };
    return this.http.get<User[]>(this.apiAllDrivers, { params });
  }

  getDriverById(driverId: number): Observable<DriverResponse> {
    const url = `${this.apiAllDrivers}/${driverId}`;
    return this.http.get<DriverResponse>(url);
  }

  getUserDetail(token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger;
      if (userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      this.localStorage?.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      const userResponseJSON = this.localStorage?.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error(
        'Error retrieving user response from local storage:',
        error
      );
      return null; 
    }
  }
  removeUserFromLocalStorage(): void {
    try {
      this.localStorage?.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
    }
  }
  getUsers(params: {
    page: number;
    limit: number;
    keyword: string;
  }): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users`;
    return this.http.get<ApiResponse>(url, { params: params });
  }

  resetPassword(userId: number): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users/reset-password/${userId}`;
    return this.http.put<ApiResponse>(url, null, this.apiConfig);
  }

  toggleUserStatus(params: {
    userId: number;
    enable: boolean;
  }): Observable<ApiResponse> {
    const url = `${environment.apiBaseUrl}/users/block/${params.userId}/${
      params.enable ? '1' : '0'
    }`;
    return this.http.put<ApiResponse>(url, null, this.apiConfig);
  }

  updateUserDetail(
    token: string,
    updateUserDTO: UpdateUserDTO
  ): Observable<ApiResponse> {
    debugger;
    let userResponse = this.getUserResponseFromLocalStorage();
    return this.http.put<ApiResponse>(
      `${this.apiUserDetail}/${userResponse?.id}`,
      updateUserDTO,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  updateLicensesForDriver(id: number, licenseIds: Array<number>) {
    const url = `${environment.apiBaseUrl}/users/license/${id}`;
    return this.http.post(url, licenseIds);
  }

  uploadImage(userId: number, files: File[]): Observable<any> {
    const formData = new FormData();

    if (!files || files.length === 0) {
      console.error('No files to upload.');
      return EMPTY;
    }

    const file = files[0];
    formData.append('files', file);

    const url = `${environment.apiBaseUrl}/users/uploads/${userId}`;

    return this.http.post(url, formData);
  }
}
