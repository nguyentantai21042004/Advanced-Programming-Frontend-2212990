import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleResponse } from '../../../../responses/vehicles/vehicle.response';
import { VehicleService } from '../../../../service/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MaintenanceDTO } from '../../../../dtos/maintenance/maintenance.dto';
import { MaintenanceService } from '../../../../service/mainenance.service';
import { ApiResponse } from '../../../../responses/api.response';
import { Maintenance } from '../../../../models/maintenancies/maintenancy';
import { UserService } from '../../../../service/user.service';
import { UserResponse } from '../../../../responses/user/user.response';
import { UpdateMaintenanceDTO } from '../../../../dtos/maintenance/update.maintenancy.dto';

@Component({
  selector: 'app-maintain-vehicle-admin',
  templateUrl: './maintain.vehicle.admin.component.html',
  styleUrls: ['./maintain.vehicle.admin.component.scss'],
})
export class MaintainVehicleAdminComponent implements OnInit {
  @ViewChild('maintainance') maintainance!: NgForm;

  vehicleId: number = 0;
  vehicleResponse: VehicleResponse = {
    id: 0,
    name: '',
    payload: 0,
    material: '',
    status: '',
    licensePlate: '',
    vehicleType: '',
    driverLicense: 0,
    rentalPrice: 0,
    thumbnail: '',
    url: '',
    vehicle_images: [],
  };

  maintenanceDTO: MaintenanceDTO = {
    vehicle_id: 0,
    maintenance_date: new Date(),
    maintenance_type: '',
    description: '',
    cost: 0,
  };
  selectedFiles: File[] = [];
  histories: Maintenance[] = [];
  userResponse?: UserResponse | null;

  updateDTO: UpdateMaintenanceDTO = {
    status: '',
  };

  currentPage: number = 0;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(
    private vehicleService: VehicleService, // Correctced service name
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getVehicleById();
  }

  getVehicleById(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (response: any) => {
        this.vehicleResponse = response.data;
        this.maintenanceDTO.vehicle_id = this.vehicleResponse.id;
        if (this.vehicleResponse.thumbnail != null) {
          this.vehicleResponse.url = `http://localhost:8080/api/v1/vehicles/images/${this.vehicleResponse.thumbnail}`;
        }
        this.getMaintenancesById(
          this.vehicleResponse.id,
          this.currentPage,
          this.itemsPerPage
        );
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      },
    });
  }

  getMaintenancesById(id: number, page: number, limit: number) {
    this.maintenanceService
      .getMaintenancesByVehicle(id, page, limit)
      .subscribe({
        next: (response: any) => {
          this.histories = response.data.maintenances;
          this.totalPages = response.data.totalPages;
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          );
        },
        error: (error: any) => {
          console.error('Error fetching detail:', error);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.getMaintenancesById(
      this.vehicleId,
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

  addMaintenance() {
    this.maintenanceService.addMaintenance(this.maintenanceDTO).subscribe({
      next: (response: ApiResponse) => {
        alert('Successfully added the new maintenancy to our company');
      },
      complete: () => {},
      error: (error: any) => {
        alert('This vehicle in not AVAILABLE now !!!');
        console.error('Error fetching detail:', error);
      },
    });
  }

  update(id: number, updateDTO: UpdateMaintenanceDTO) {
    this.maintenanceService.updateMaintenance(id, updateDTO).subscribe({
      next: (response) => {
        alert('Update Maintenance Successfully');
      },
      error: (error) => {
        console.error('Error uploading images:', error);
      },
    });
  }

  doneAction(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to finish this maintenance?'
    );
    if (confirmation) {
      this.updateDTO.status = 'DONE';
      this.update(id, this.updateDTO);
    }
  }

  cancelAction(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to cancel this maintenance?'
    );
    if (confirmation) {
      this.updateDTO.status = 'CANCELED';
      this.update(id, this.updateDTO);
    }
  }

  deleteAction(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this maintenance?'
    );
    if (confirmation) {
      this.maintenanceService.delete(id).subscribe({
        next: (response: any) => {
          alert('Successfully delete a maintenance with id ' + id);
        },

        error: (error: any) => {
          console.error('Error fetching products', error);
        },
      });
    }
  }
}
