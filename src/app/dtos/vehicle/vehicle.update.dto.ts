export class VehicleUpdateDTO {
  status: string;
  vehicle_type: string;
  rental_price: number;

  constructor(data: any) {
    this.status = data.status;
    this.vehicle_type = data.vehicle_type;
    this.rental_price = data.rental_price;
  }
}
