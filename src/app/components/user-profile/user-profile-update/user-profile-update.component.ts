import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserResponse } from '../../../responses/user/user.response';
import { UpdateUserDTO } from '../../../dtos/user/update.user.dto';
import { License } from '../../../models/license';
import { TokenService } from '../../../service/token.service';
import { LicenseSerive } from '../../../service/license.service';
import { UserService } from '../../../service/user.service';
import { LicenseResponse } from '../../../responses/license/license.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrl: './user-profile-update.component.scss',
})
export class UserProfileUpdateComponent {
  @ViewChild('updateUser') updateUserForm!: NgForm;

  token: string = '';
  userResponse?: UserResponse;
  selectedFiles: File[] = [];
  updateUserDTO: UpdateUserDTO = {
    full_name: '',
    address: '',
    status: '',
  };
  updateLicenseDTO: number[] = [];
  licenses: License[] = [];

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private licenseService: LicenseSerive,
    private userService: UserService
  ) {}

  getLicenseNames(licenses: License[] | undefined): string {
    if (!licenses) {
      return 'NULL';
    }
    return licenses.map((license) => license.name).join(', ');
  }

  ngOnInit(): void {
    const tokenFromService = this.tokenService.getToken();
    this.token = tokenFromService ? String(tokenFromService) : '';
    this.userService.getUserDetail(this.token).subscribe({
      next: (response: any) => {
        const createdAtArray = response.data.createdAt;
        const createdAtDate = new Date(
          createdAtArray[0],
          createdAtArray[1] - 1,
          createdAtArray[2],
          createdAtArray[3],
          createdAtArray[4],
          createdAtArray[5]
        );

        const updateAtArray = response.data.updatedAt;
        const updatedAtDate = new Date(
          updateAtArray[0],
          updateAtArray[1] - 1,
          updateAtArray[2],
          updateAtArray[3],
          updateAtArray[4],
          updateAtArray[5]
        );

        this.userResponse = {
          ...response.data,
          createdAt: createdAtDate,
          updatedAt: updatedAtDate,
          image_url: `http://localhost:8080/api/v1/users/images/${response.data.img}`,
        };

        this.updateUserDTO = {
          ...this.userResponse,
          full_name: this.userResponse?.full_name || '',
          address: this.userResponse?.address || '',
          status: this.userResponse?.status || '',
        };

        this.userService.saveUserResponseToLocalStorage(this.userResponse);
      },
      complete: () => {},
      error: (error: any) => {
        console.error(error?.error?.message ?? '');
      },
    });

    this.getLicenses();
  }

  getLicenses() {
    this.licenseService.getLicenses().subscribe({
      next: (response: LicenseResponse) => {
        this.licenses = response.data;
      },
      complete: () => {},
      error: (error: any) => {
        console.error(`Lỗi khi lấy danh sách licenses:`, error);
      },
    });
  }

  updateLicenses() {
    this.userService
      .updateLicensesForDriver(
        this.userResponse?.id || 0,
        this.updateLicenseDTO
      )
      .subscribe({
        next: (response: any) => {
          alert('Successfully updated licenses for you');
        },
        error: (error: any) => {
          console.error(error?.error?.message ?? '');
        },
      });
  }

  save(): void {
    if (this.userResponse) {
      this.onUpload(this.userResponse.id);
      this.updateLicenses();
      this.updateUserDetail();
    }
  }

  updateUserDetail() {
    this.userService
      .updateUserDetail(this.token, this.updateUserDTO)
      .subscribe({
        next: (response: any) => {
          this.userService.removeUserFromLocalStorage();
          this.tokenService.removeToken();
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error(error?.error?.message ?? '');
        },
      });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onUpload(vehicleId: number) {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least one file to upload.');
      return;
    }
    this.userService.uploadImage(vehicleId, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Images uploaded successfully:', response);
        this.selectedFiles = [];
      },
      error: (error) => {
        console.error('Error uploading images:', error);
      },
    });
  }
}
