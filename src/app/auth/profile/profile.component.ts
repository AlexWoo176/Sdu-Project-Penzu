import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../token-storage.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {PassForm} from './pass-form';
import {UserForm} from './user-form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  info: any;
  user: User;
  filePath: any;
  fileUpload: File;
  inputName = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)])
  });
  returnUrl: string;
  name: any;
  isError = false;
  error = '';
  isErrorUser = false;
  errorUser = '';
  passForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(36)])
  });
  processValue = 0;

  constructor(private token: TokenStorageService, private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail(),
      avatar: this.token.getAvatar(),
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    this.getUser();
  }

  getUser() {
    if (this.token) {
      this.userService.getUserById(this.token.getUserId()).subscribe(
        result => {
          this.user = result;
        }
      );
    }
  }

  updatePassword(closeButton: HTMLInputElement) {
    const {currentPassword, newPassword, confirmPassword} = this.passForm.value;
    if (newPassword !== confirmPassword) {
      this.isError = true;
      return this.error = 'Password confirm not match ';
    }

    const formPass = new PassForm(this.info.userId, this.info.username, currentPassword, newPassword);
    this.authService.updatePassword(formPass).subscribe(
      result => {
        closeButton.click();
        this.logout();
        this.router.navigateByUrl(this.returnUrl);
        alert('Change password successful. Please ReLogin !');
      }
    );
  }

  updateUser(closeButton: HTMLInputElement) {
    const {name} = this.inputName.value;

    if (name === '') {
      this.isErrorUser = true;
      return this.errorUser = 'Fail! Nothing Change.';
    }
    const userForm = new UserForm(this.info.userId, name);

    this.authService.updateUser(userForm).subscribe(
      result => {
        closeButton.click();
        this.logout();
        alert('Update successful. Please ReLogin !');
        this.router.navigateByUrl(this.returnUrl);
      }
    );
  }

  logout() {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  saveAvatar(openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    if (this.token) {
      const count = setInterval(() => {
        this.processValue += 10;
        if (this.processValue === 90) {
          this.processValue += 9;
          clearInterval(count);
        }
      }, 1000);
      openProcessBar.click();
      const form = new FormData();
      form.append('file', this.fileUpload);
      this.userService.uploadUserAvatar(form, this.token.getUserId()).subscribe(
        result => {
          clearInterval(count);
          this.processValue = 100;
          setTimeout(() => {
            this.getUser();
            this.token.saveAvatar(this.user.avatar);
            console.log('ok');
            closeProcess.click();
            this.processValue = 0;
          }, 500);
        }
      );
    }
  }
}
