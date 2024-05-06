import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
} from 'class-validator'

export class RegisterDTO {
    // Dat ten theo phong cach json trong postman

    @IsString()
    full_name: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsString()
    @IsNotEmpty()   
    address: string;

    role_id: number = 2;

    status: string;

    constructor(data : any){
        this.full_name = data.fullname;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.role_id = data.role_id || 2;
        this.status = 'INACTIVE';
    }
}