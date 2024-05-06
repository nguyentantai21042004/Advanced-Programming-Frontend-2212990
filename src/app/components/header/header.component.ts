import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if (index === 0) {
      this.router.navigate(['/profile']);
    } else if (index === 1) {
      this.router.navigate(['/driverOrders']);
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

  setActiveNavItem(index: number) {
    this.activeNavItem = index;
  }
}
