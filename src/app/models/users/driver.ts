import { License } from '../../models/license';
import { Role } from '../../models/role';

export interface Driver {
  full_name: any;
  id: number;
  phone_number: string;
  address: string;
  status: string;
  role: Role;
  licenses: License[];
  img: string;

  image_url: string;

  createdAt: Date;
  updatedAt: Date;
}
