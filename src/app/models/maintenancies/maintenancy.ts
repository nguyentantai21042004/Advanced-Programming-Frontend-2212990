export interface Maintenance {
  id: number;

  vehicle_id: number;

  maintenance_date: Date;

  maintenance_type: string;

  description: string;
  
  status: string;  

  cost: number;
}
