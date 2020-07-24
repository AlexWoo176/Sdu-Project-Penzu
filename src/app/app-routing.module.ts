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
import {AlbumHomeComponent} from './album-home/album-home.component';
import {DiaryDetailComponent} from './diary/diary-detail/diary-detail.component';
import {AlbumDetailComponent} from './album/album-detail/album-detail.component';
import {DiaryCreateComponent} from './diary/diary-create/diary-create.component';
import {AlbumListOfUserComponent} from './album/album-list-of-user/album-list-of-user.component';
import {DiaryListOfUserComponent} from './diary/diary-list-of-user/diary-list-of-user.component';
import {DiaryUpdateComponent} from './diary/diary-update/diary-update.component';
import {AlbumCreateComponent} from './album/album-create/album-create.component';
import {AlbumAddImageComponent} from './album/album-add-image/album-add-image.component';
import {DiarySearchByTitleAndTagComponent} from './diary/diary-search-by-title-and-tag/diary-search-by-title-and-tag.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', component: BlogMainComponent},
    ]
  },
  {
    path: 'album',
    component: AlbumHomeComponent
  },
  {
    path: 'diary/:id',
    component: DiaryDetailComponent
  },
  {
    path: 'album-detail/:id',
    component: AlbumDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeamGuard],
  },
  {
    path: 'manage-tag/:id',
    component: DiarySearchByTitleAndTagComponent,
  },
  {
    path: 'sdu',
    component: DiaryComponent,
    canActivate: [CanActivateTeamGuard],
    children: [
      {
        path: '',
        component: DiaryCreateComponent
      },
      {
        path: 'album-picture-create',
        component: AlbumCreateComponent,
      },
      {
        path: 'album-picture-add-image/:id',
        component: AlbumAddImageComponent,
      },
      {
        path: 'album-of-user',
        component: AlbumListOfUserComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [CanActivateTeamGuard],
      },
      {
        path: 'listUserDiary',
        component: DiaryListOfUserComponent,
        canActivate: [CanActivateTeamGuard],
      },
      {
        path: 'updateDiary/:id',
        component: DiaryUpdateComponent
      },
      {
        path: 'manageTag',
        component: ManageTagComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageDiary',
        component: ManageDiaryComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageUser',
        component: ManageUserComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'manageAlbum',
        component: ManageAlbumComponent,
        canActivate: [IsAdminGuard]
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotActivateTeamGuard],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
