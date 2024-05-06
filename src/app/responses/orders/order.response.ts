export interface OrderResponse {
  id: number;
  vehicleId: number;
  vehicleName: string;
  driverId: number;
  driverName: string;
  driverPhone: string;
  startPlace: string;
  endPlace: string;
  startDate: Date;
  customerPhone: string;
  distance: number;
  duration: number;
  status: string;
  vehiclePrice: number;
  driverPrice: number;
  sumOfExpense: number;
  profit: number;
}
