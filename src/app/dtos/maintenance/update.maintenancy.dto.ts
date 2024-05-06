export class UpdateMaintenanceDTO {
  status: string;
  constructor(data: any) {
    this.status = data.status;
  }
}
