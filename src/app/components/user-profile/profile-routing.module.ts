import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'profile/update',
    component: UserProfileUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
