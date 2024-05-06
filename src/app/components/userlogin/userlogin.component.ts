import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LoginDTO } from '../../dtos/user/login.dtos';
import { ApiResponse } from '../../responses/api.response';
import { TokenService } from '../../service/token.service';
import { UserResponse } from '../../responses/user/user.response';
import { Role } from '../../models/role';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss',
})
export class UserloginComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  roles: Role[] = [];
  phoneNumber: string;
  password: string;
  rememberMe: boolean = true;
  selectedRole: number = 2;
  userResponse?: UserResponse;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {
    this.phoneNumber = '';
    this.password = '';
  }
  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (apiResponse: ApiResponse) => {
        const roles = apiResponse.data;
        this.roles = roles;
      },
      error: (error: any) => {
        console.error(error?.error?.message ?? '');
      },
    });
  }

  login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      roleId: this.selectedRole,
    };
    this.userService.login(loginDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        const { token } = apiResponse.data;

        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (apiResponse2: ApiResponse) => {
              this.userResponse = {
                ...apiResponse2.data,
              };
              this.userService.saveUserResponseToLocalStorage(
                this.userResponse
              );

              if (this.userResponse?.role.name == 'ADMIN') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }
            },
            error: (error: any) => {
              alert('Invalid user with this phone number and role Id');
            },
          });
        }
      },
      error: (error: any) => {
        alert(
          'Invalid user with this phone number and role Id. \nPlease check again or contact to hotline: 0369169678'
        );
      },
    });
  }

  Register() {
    this.router.navigate(['/register']);
  }
}
