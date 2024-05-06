import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { Router } from '@angular/router';
import { License } from '../../models/license';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  token: string = '';
  userResponse?: UserResponse;
  selectedFiles: File[] = [];
  licenseString: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService
  ) {}
  getLicenseNames(licenses: License[] | undefined): string {
    if (!licenses) {
      return 'NULL';
    }
    return licenses.map((license) => license.name).join(', ');
  }

  ngOnInit(): void {
    const tokenFromService = this.tokenService.getToken();
    this.token = tokenFromService ? String(tokenFromService) : '';
    this.userService.getUserDetail(this.token).subscribe({
      next: (response: any) => {
        const createdAtArray = response.data.createdAt;
        const createdAtDate = new Date(
          createdAtArray[0],
          createdAtArray[1] - 1,
          createdAtArray[2],
          createdAtArray[3],
          createdAtArray[4],
          createdAtArray[5]
        );

        const updateAtArray = response.data.updatedAt;
        const updatedAtDate = new Date(
          updateAtArray[0],
          updateAtArray[1] - 1,
          updateAtArray[2],
          updateAtArray[3],
          updateAtArray[4],
          updateAtArray[5]
        );

        this.userResponse = {
          ...response.data,
          createdAt: createdAtDate,
          updatedAt: updatedAtDate,
          image_url: `http://localhost:8080/api/v1/users/images/${response.data.img}`,
        };
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
        this.licenseString = this.getLicenseNames(this.userResponse?.licenses);
      },
      complete: () => {},
      error: (error: any) => {
        console.error(error?.error?.message ?? '');
      },
    });
  }

  GoToEdit() {
    this.router.navigate(['/profile/update']);
  }
}
