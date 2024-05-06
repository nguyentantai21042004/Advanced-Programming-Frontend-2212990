export class VehicleDTO {
  name: string;
  payload: number;
  material: string;
  status: string;
  license_plate: string;
  vehicle_type: string;
  driver_license: string;
  rental_price: number;

  constructor(data : any){
    this.name = data.name;
    this.payload = data.payload;
    this.material = data.material;
    this.status = data.status;
    this.license_plate = data.license_plate;
    this.vehicle_type = data.vehicle_type;
    this.driver_license = data.driver_license;
    this.rental_price = data.rental_price;
  }
}
