import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Permissions} from './auth-guard/permissions';
import {CanActivateTeamGuard} from './auth-guard/can-activate-team.guard';
import {NotActivateTeamGuard} from './auth-guard/not-activate-team.guard';
import {IsAdminGuard} from './auth-guard/is-admin.guard';
import { ManageAlbumComponent } from './admin/manage-album/manage-album.component';
import { ManageDiaryComponent } from './admin/manage-diary/manage-diary.component';
import { ManageTagComponent } from './admin/manage-tag/manage-tag.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { BlogMainComponent } from './diary-home/blog-main/blog-main.component';
import { HomeComponent } from './diary-home/home.component';
import { FeaturedComponent } from './diary-home/featured/featured.component';
import { FooterComponent } from './diary-home/footer/footer.component';
import { HeaderComponent } from './diary-home/header/header.component';
import { SideBarComponent } from './diary-home/side-bar/side-bar.component';
import { DiaryComponent } from './diary/diary.component';
import { AlbumHomeComponent } from './album-home/album-home.component';
import { AlbumMainComponent } from './album-home/album-main/album-main.component';
import {CKEditorModule} from 'ngx-ckeditor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { DiaryCreateComponent } from './diary/diary-create/diary-create.component';
import { DiaryDetailComponent } from './diary/diary-detail/diary-detail.component';
import { DiaryListOfUserComponent } from './diary/diary-list-of-user/diary-list-of-user.component';
import { DiarySearchByTitleAndTagComponent } from './diary/diary-search-by-title-and-tag/diary-search-by-title-and-tag.component';
import { DiaryUpdateComponent } from './diary/diary-update/diary-update.component';
import { SafeHtmlPipe } from './diary/diary-detail/safe-html.pipe';
import { AlbumAddImageComponent } from './album/album-add-image/album-add-image.component';
import { AlbumCreateComponent } from './album/album-create/album-create.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { AlbumListOfUserComponent } from './album/album-list-of-user/album-list-of-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ManageAlbumComponent,
    ManageDiaryComponent,
    ManageTagComponent,
    ManageUserComponent,
    BlogMainComponent,
    HomeComponent,
    FeaturedComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    DiaryComponent,
    AlbumHomeComponent,
    AlbumMainComponent,
    DiaryCreateComponent,
    DiaryDetailComponent,
    DiaryListOfUserComponent,
    DiarySearchByTitleAndTagComponent,
    DiaryUpdateComponent,
    SafeHtmlPipe,
    AlbumAddImageComponent,
    AlbumCreateComponent,
    AlbumDetailComponent,
    AlbumListOfUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [Permissions, CanActivateTeamGuard, NotActivateTeamGuard, IsAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
