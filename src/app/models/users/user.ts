import { License } from '../license';
import { Role } from '../role';

export interface User {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  status: string;
  role: Role;
  licenses: License[];
  img: string;
}
