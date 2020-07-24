import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchUserByName} from '../../model/search-user-by-name';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userList: User[] = [];
  returnUrl: any;
  tokenUserId: string;
  role: string[];
  constructor(private userService: UserService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router, ) {
    this.tokenUserId = this.token.getUserId();
    this.role = this.token.getAuthorities();
  }
  userId: string;
  name: '';

  ngOnInit() {
    this.getListUser();
  }

  getListUser() {
    this.userService.getListUser().subscribe(
      result => {
        this.userList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getUserId(id: string) {
    this.userId = id;
    // console.log(this.tokenUserId , this.userId);
  }

  deleteUser(closeModalRef2: HTMLButtonElement) {
    this.userService.deleteUserById(this.userId).subscribe(
      result => {
        if (this.userId === this.tokenUserId) {
          this.logout();
        }
        this.getListUser();
        closeModalRef2.click();
      }, error => {
        // console.log(error);
      }
    );
    // console.log(this.tokenUserId , this.userId);
  }

  searchByName() {
    const user: SearchUserByName = {
      name: this.name
    };
    this.userService.searchUserByName(user).subscribe(
      result => {
        this.userList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }
}
