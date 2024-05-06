import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class OrderDTO {
    @IsNotEmpty()
    vehicleId: number;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    startPlace: string;

    @IsNotEmpty()
    @IsString()
    endPlace: string;

    startDate: Date;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    status: string;

    constructor(data: any) {
        this.vehicleId = data.vehicleId;
        this.userId = data.userId;
        this.startPlace = data.startPlace;
        this.endPlace = data.endPlace;
        this.startDate = data.startDate;
        this.phoneNumber = data.phone_number;
        this.status = data.status;
    }
}
