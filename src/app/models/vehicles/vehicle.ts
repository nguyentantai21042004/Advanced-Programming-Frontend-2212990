// Dat ten theo respone trong backend
import { VehicleImage  } from "./vehicle.image";

export interface Vehicle {
    id: number;
    name: string;
    payload: number;
    material: string;
    status: string;
    licensePlate: string;
    vehicleType: string;
    driverLicense: number;
    thumbnail: string;
    rentalPrice: number;

    url: string;
    vehicle_images: VehicleImage[];
}