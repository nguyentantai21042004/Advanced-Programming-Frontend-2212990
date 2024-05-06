import { License } from "../../models/license";

export interface LicenseResponse {
    message: string;
    status: string;
    data: License[]; // Change data type to License array
  }
  