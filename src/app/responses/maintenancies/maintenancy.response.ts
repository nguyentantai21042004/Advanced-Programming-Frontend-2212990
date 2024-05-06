import { MaintenanceImage } from "../../models/maintenancies/maintenancy.image";

export interface MaintenanceResponse {
  id: number;

  vehicle_id: number;

  maintenance_date: Date;

  maintenance_type: string;

  description: string;

  cost: number;

  image_url: string;

}
