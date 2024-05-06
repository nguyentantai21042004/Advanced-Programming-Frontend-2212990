import { VehicleImage } from "../../models/vehicles/vehicle.image";

export interface VehicleResponse {
  id: number;
  name: string;
  payload: number;
  material: string;
  status: string;
  licensePlate: string;
  vehicleType: string;
  driverLicense: number;
  rentalPrice: number;
  thumbnail: string;

  url: string;
  vehicle_images: VehicleImage[];
}
