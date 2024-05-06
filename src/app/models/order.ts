export interface Order {
  id: number;
  vehicleId: number;
  driverId: number;
  startPlace: string;
  endPlace: string;
  startDate: number; // Assuming startDate is in milliseconds since epoch
  customerPhone: string; // Assuming phoneNumber corresponds to customerPhone in Java class
  status: string;
  distance: number; // Assuming distance is a number in kilometers
  duration: number; // Assuming duration is in minutes
  sumOfExpense: number;
  profit: number;
}
