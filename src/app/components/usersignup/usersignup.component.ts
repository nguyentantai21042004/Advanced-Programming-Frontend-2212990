import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../dtos/user/register.dtos';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.scss',
})
export class UsersignupComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  fullName: string;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  address: string;
  isAccepted: boolean;

  constructor(private router: Router, private UserService: UserService) {
    this.fullName = '';
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.address = '';
    this.isAccepted = false;
  }

  onPhoneChange() {
    console.log(`Phone type: ${this.phoneNumber}`);
  }

  register() {
    const registerDTO: RegisterDTO = {
      full_name: this.fullName,
      phone_number: this.phoneNumber,
      password: this.password,
      retype_password: this.retypePassword,
      address: this.address,
      role_id: 2,
      status: 'INACTIVE',
    };

    this.UserService.register(registerDTO).subscribe({
      next: (response: any) => {
        alert('Đăng kí thành công');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error}`);
      },
    });
  }

  checkMatchPassword() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({
        passwordsDoNotMatch: true,
      });
    } else {
      if (this.registerForm.form.controls['retypePassword'].touched) {
        this.registerForm.form.controls['retypePassword'].setErrors(null);
      }
    }
  }

  TrainToBusan() {
    this.router.navigate(['/login']);
  }
}
