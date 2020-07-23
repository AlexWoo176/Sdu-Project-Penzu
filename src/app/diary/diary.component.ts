import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  info: { name: string; userId: string; authorities: string[]; token: string; username: string };

  constructor(private token: TokenStorageService) {
  }


  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };
  }

}
