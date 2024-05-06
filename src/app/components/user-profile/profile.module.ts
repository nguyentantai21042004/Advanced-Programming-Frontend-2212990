import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserProfileHeaderComponent } from './user-profile-header/user-profile-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileUpdateComponent,
    UserProfileHeaderComponent,
  ],
  imports: [ProfileRoutingModule, CommonModule, FormsModule, NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProfileModule {}
