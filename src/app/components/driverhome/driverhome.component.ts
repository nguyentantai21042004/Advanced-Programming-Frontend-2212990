import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users/user';
import { UserService } from '../../service/user.service';
import { License } from '../../models/license';

@Component({
  selector: 'app-driverhome',
  templateUrl: './driverhome.component.html',
  styleUrl: './driverhome.component.scss',
})
export class DriverhomeComponent implements OnInit {
  drivers: User[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 8;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  ngOnInit(): void {
    this.getAllDrivers(this.currentPage, this.itemsPerPage);
  }

  getLicenseNames(licenses: License[] | undefined): string {
    if (!licenses) {
      return 'NULL';
    }
    return licenses.map((license) => license.name).join(', ');
  }

  constructor(private userService: UserService) {}

  getAllDrivers(page: number, limit: number) {
    this.userService.getAllDrivers(page, limit).subscribe({
      next: (response: any) => {
        response.data.users.forEach((user: User) => {
          user.img = `http://localhost:8080/api/v1/users/images/${user.img}`;
        });
        this.drivers = response.data.users;
        this.totalPages = response.data.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
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
}
