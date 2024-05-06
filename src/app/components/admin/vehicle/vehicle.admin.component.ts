import { Component } from '@angular/core';
import { Vehicle } from '../../../models/vehicles/vehicle';
import { VehicleService } from '../../../service/vehicle.service';
import { Router } from '@angular/router';
import { VehicleResponse } from '../../../responses/vehicles/vehicle.response';

@Component({
  selector: 'app-vehicle-admin',
  templateUrl: './vehicle.admin.component.html',
  styleUrl: './vehicle.admin.component.scss',
})
export class VehicleAdminComponent {
  vehicles: Vehicle[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 7;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  vehicleType: string = '';

  constructor(private vehicleService: VehicleService, private router: Router) {}

  onComboboxChange(selectedValue: string) {
    this.vehicleType = selectedValue;
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 8;
    this.getVehicles(
      this.keyword,
      this.vehicleType,
      this.currentPage,
      this.itemsPerPage
    );
  }

  ngOnInit() {
    this.getVehicles(
      this.keyword,
      this.vehicleType,
      this.currentPage,
      this.itemsPerPage
    );
  }

  getVehicles(
    keyword: string,
    vehicleType: string,
    page: number,
    limit: number
  ) {
    this.vehicleService
      .getAllVehicles(keyword, vehicleType, page, limit)
      .subscribe({
        next: (response: any) => {
          response.data.vehicles.forEach((vehicle: Vehicle) => {
            vehicle.url = `http://localhost:8080/api/v1/vehicles/images/${vehicle.thumbnail}`;
          });
          this.vehicles = response.data.vehicles;
          this.totalPages = response.data.totalPages;
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          );
        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.getVehicles(
      this.keyword,
      this.vehicleType,
      this.currentPage,
      this.itemsPerPage
    );
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

  maintain(vehicle: VehicleResponse) {
    this.router.navigate(['/admin/vehiclesAD/maintain', vehicle.id]);
  }

  viewDetails(vehicle: VehicleResponse) {
    this.router.navigate(['/admin/vehiclesAD', vehicle.id]);
  }

  deleteVehicle(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this vehicle?'
    );
    if (confirmation) {
      this.vehicleService.deleteVehcile(id).subscribe({
        next: (response: any) => {
          alert('Successfully delete a vehicle with id ' + id);
        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        },
      });
    }
  }

  addNewVehicle() {
    this.router.navigate(['/admin/vehiclesAD/add']);
  }
}
