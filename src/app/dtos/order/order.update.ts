export class OrderUpdateDTO {
  status: string;

  constructor(data: any) {
    this.status = data.status;
  }
}
