export class MaintenanceDTO{
  vehicle_id: number;
  maintenance_date: Date;
  maintenance_type: string;
  description: string;
  cost: number;

  constructor(data: any) {
    this.vehicle_id = data.vehicle_id;
    this.maintenance_date = data.maintenance_date;
    this.maintenance_type = data.maintenance_type;
    this.description = data.description;
    this.cost = data.cost;
  }
}
