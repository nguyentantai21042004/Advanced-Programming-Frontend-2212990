import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/users/user';
import { License } from '../../../models/license';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-admin',
  templateUrl: './driver.admin.component.html',
  styleUrl: './driver.admin.component.scss',
})
export class DriverAdminComponent {
  drivers: User[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 7;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  ngOnInit(): void {
    this.userService.getUserResponseFromLocalStorage();
    this.getAllDrivers(0, 8);
  }

  constructor(private userService: UserService, private router: Router) {}

  getLicenseNames(licenses: License[]): string {
    return licenses.map((license) => license.name).join(', ');
  }

  getAllDrivers(page: number, limit: number) {
    this.userService.getAllDrivers(page, limit).subscribe({
      next: (response: any) => {
        this.drivers = response.data.users;
        this.drivers.forEach((driver: any) => {
          driver.img = `http://localhost:8080/api/v1/users/images/${driver.img}`;
        });
        this.totalPages = response.data.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching products', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page < 0 ? 0 : page;
    this.getAllDrivers(this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  viewDetails(driver: User) {
    this.router.navigate(['/admin/drivers', driver.id]);
  }
}
