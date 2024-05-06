import { Component } from '@angular/core';
import { Vehicle } from '../../models/vehicles/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehiclehome',
  templateUrl: './vehiclehome.component.html',
  styleUrl: './vehiclehome.component.scss',
})
export class VehiclehomeComponent {
  vehicles: Vehicle[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 8;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  vehicleType: string = '';

  constructor(private vehicleService: VehicleService) {}

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
}
