import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {NotActivateTeamGuard} from './auth-guard/not-activate-team.guard';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './diary-home/home.component';
import {BlogMainComponent} from './diary-home/blog-main/blog-main.component';
import {DiaryComponent} from './diary/diary.component';
import {CanActivateTeamGuard} from './auth-guard/can-activate-team.guard';
import {ProfileComponent} from './auth/profile/profile.component';
import {ManageTagComponent} from './admin/manage-tag/manage-tag.component';
import {IsAdminGuard} from './auth-guard/is-admin.guard';
import {ManageDiaryComponent} from './admin/manage-diary/manage-diary.component';
import {ManageUserComponent} from './admin/manage-user/manage-user.component';
import {ManageAlbumComponent} from './admin/manage-album/manage-album.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', component: BlogMainComponent}
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotActivateTeamGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeamGuard]
  },
  {
    path: 'sdu',
    component: DiaryComponent,
    canActivate: [CanActivateTeamGuard],
    children: [
      { path: 'profile' ,
        component: ProfileComponent,
        canActivate: [CanActivateTeamGuard],
      },
      {
        path: 'manageTag' ,
        component: ManageTagComponent ,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageDiary' ,
        component: ManageDiaryComponent ,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageUser' ,
        component: ManageUserComponent ,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageAlbum' ,
        component: ManageAlbumComponent ,
        canActivate: [IsAdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
