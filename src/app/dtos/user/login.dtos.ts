import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
} from 'class-validator'

export class LoginDTO {
    // Dat ten theo phong cach json trong postman
    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    roleId: number;

    constructor(data : any){
        this.phone_number = data.phone_number;
        this.password = data.password;
        this.roleId = data.roleId;
    }
}