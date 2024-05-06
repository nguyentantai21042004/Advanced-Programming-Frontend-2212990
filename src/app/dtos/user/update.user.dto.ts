export class UpdateUserDTO {
    full_name: string;    
    address: string;    
    status: string;    
    
    constructor(data: any) {
        this.full_name = data.fullname;
        this.address = data.address;
        this.status = data.status;        
    }
}