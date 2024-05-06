import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleResponse } from '../../../../responses/vehicles/vehicle.response';
import { VehicleUpdateDTO } from '../../../../dtos/vehicle/vehicle.update.dto';
import { VehicleService } from '../../../../service/vehicle.service';

@Component({
  selector: 'app-detail-vehicle-admin',
  templateUrl: './detail.vehicle.admin.component.html',
  styleUrls: ['./detail.vehicle.admin.component.scss'],
})
export class DetailVehicleAdminComponent implements OnInit {
  vehicleId: number = 0;
  selectedFiles: File[] = [];

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

  vehicleUpdateDTO: VehicleUpdateDTO = {
    status: '',
    vehicle_type: '',
    rental_price: 0,
  };

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  getOrderDetails(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (response: any) => {
        this.vehicleResponse = response.data;

        if (this.vehicleResponse.thumbnail != null) {
          this.vehicleResponse.url = `http://localhost:8080/api/v1/vehicles/images/${this.vehicleResponse.thumbnail}`;
        }
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      },
    });
  }

  update(): void {
    this.vehicleService
      .updateVehicle(this.vehicleId, this.vehicleUpdateDTO)
      .subscribe({
        next: (response: any) => {
          alert('Vehicle updated successfully:');
          this.router.navigate(['/admin/vehiclesAD'], {
            relativeTo: this.route,
          });
        },
        error: (error: any) => {
          console.error('Error updating vehicle:', error);
        },
      });
  }
}
