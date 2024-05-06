import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleService } from '../../../../service/vehicle.service';
import { ApiResponse } from '../../../../responses/api.response';
import { VehicleDTO } from '../../../../dtos/vehicle/vehicle.dto';
import { LicenseSerive } from '../../../../service/license.service';
import { LicenseResponse } from '../../../../responses/license/license.response';
import { License } from '../../../../models/license';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle-admin',
  templateUrl: './add.vehicle.admin.component.html',
  styleUrls: ['./add.vehicle.admin.component.scss'],
})
export class AddVehicleAdminComponent implements OnInit {
  @ViewChild('addVehicleForm') addVehicleForm!: NgForm;

  constructor(
    private vehicleService: VehicleService,
    private licenseService: LicenseSerive,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  insertVehicleDTO: VehicleDTO = {
    name: '',
    payload: 1,
    material: '',
    status: '',
    license_plate: '',
    vehicle_type: '',
    driver_license: '',
    rental_price: 1,
  };
  addedVehicleId: number = 0;
  selectedFiles: File[] = [];
  licenses: License[] = [];
  isAgreed: boolean = false;

  ngOnInit(): void {
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

  toggleAgreement() {
    this.isAgreed = !this.isAgreed;
  }

  addVehicle() {
    if (this.isAgreed) {
      this.vehicleService.addVehicle(this.insertVehicleDTO).subscribe({
        next: (response: ApiResponse) => {
          this.addedVehicleId = response.data.id;
          this.onUpload(this.addedVehicleId);
          alert('Successfully added the new vehicle to our company');
        },
        complete: () => {
          this.router.navigate(['/admin/vehiclesAD'], {
            relativeTo: this.route,
          });
        },
        error: (error: any) => {
          console.error(`Lỗi khi đặt hàng:`, error);
        },
      });
    } else {
      alert('Make sure all informations are correct');
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onUpload(vehicleId: number) {
    if (this.selectedFiles.length === 0) {
      alert('Please select at least one file to upload.');
      return;
    }

    this.vehicleService.uploadImage(vehicleId, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Images uploaded successfully:', response);
        this.selectedFiles = [];
      },
      complete: () => {},
      error: (error) => {
        console.error('Error uploading images:', error);
      },
    });
  }
}
