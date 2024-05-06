import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();

    const createdAtArray = this.userResponse?.createdAt as number[] | undefined;
    if (createdAtArray) {
      const [year, month, day, hour, minute, second] = createdAtArray;
      const createdAtDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second
      );

      if (this.userResponse) this.userResponse.createdAt = createdAtDate;
    }

    const updateAtArray = this.userResponse?.updatedAt as number[] | undefined;
    if (updateAtArray) {
      const [year, month, day, hour, minute, second] = updateAtArray;
      const createdAtDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second
      );

      if (this.userResponse) this.userResponse.updatedAt = createdAtDate;
    }
  }

  showAdminComponent(componentName: string): void {
    if (componentName == 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if (componentName == 'vehiclesAD') {
      this.router.navigate(['/admin/vehiclesAD']);
    } else if (componentName == 'drivers') {
      this.router.navigate(['/admin/drivers']);
    }
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if (index === 0) {
      this.router.navigate(['/profile']);
    } else if (index === 2) {
      const confirmation = window.confirm('Are you sure you want to log out?');
      if (confirmation) {
        this.userService.removeUserFromLocalStorage();
        this.tokenService.removeToken();
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        this.router.navigate(['/']);
      }
    }
    this.isPopoverOpen = false;
  }
}
