import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { License } from '../../../../models/license';
import { DriverResponse } from '../../../../responses/user/driver.response';

@Component({
  selector: 'app-detail-driver-admin',
  templateUrl: './detail.driver.admin.component.html',
  styleUrls: ['./detail.driver.admin.component.scss'],
})
export class DetailDriverAdminComponent implements OnInit {
  driverId: number = 0;
  driver?: DriverResponse;
  licenseString: string = '';

  getLicenseNames(licenses: License[] | undefined): string {
    if (!licenses) {
      return 'NULL';
    }
    return licenses.map((license) => license.name).join(', ');
  }

  ngOnInit(): void {
    this.driverId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetailDriver();
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  getDetailDriver() {
    this.userService.getDriverById(this.driverId).subscribe({
      next: (response: any) => {
        const createdAtArray = response.data.createdAt;
        let createdAtDate: Date | undefined;
        if (createdAtArray) {
          createdAtDate = new Date(
            createdAtArray[0],
            createdAtArray[1] - 1,
            createdAtArray[2],
            createdAtArray[3],
            createdAtArray[4],
            createdAtArray[5]
          );
        }

        const updateAtArray = response.data.updatedAt;
        let updatedAtDate: Date | undefined;
        if (updateAtArray) {
          updatedAtDate = new Date(
            updateAtArray[0],
            updateAtArray[1] - 1,
            updateAtArray[2],
            updateAtArray[3],
            updateAtArray[4],
            updateAtArray[5]
          );
        }

        const image_url = response.data.img
          ? `http://localhost:8080/api/v1/users/images/${response.data.img}`
          : undefined;

        this.driver = {
          ...response.data,
          createdAt: createdAtDate,
          updatedAt: updatedAtDate,
          image_url: image_url,
        };
      },
      error: (error: any) => {
        console.error('Error fetching driver', error);
      },
    });
  }
}
