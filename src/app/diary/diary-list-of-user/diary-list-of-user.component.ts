import {Component, OnInit} from '@angular/core';
import {SearchDiaryByTitleAndUserId} from '../../model/search-diary-by-title-and-user-id';
import {Diary} from '../../model/diary';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {DiaryService} from '../../services/diary.service';

@Component({
  selector: 'app-diary-list-of-user',
  templateUrl: './diary-list-of-user.component.html',
  styleUrls: ['./diary-list-of-user.component.css']
})
export class DiaryListOfUserComponent implements OnInit {

  title: '';
  diaryId: string;
  listDiary: Diary[];

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private diaryService: DiaryService) {
  }

  ngOnInit() {
    this.getDiaryList();
  }

  getDiaryList() {
    this.userService.getDiaryByUser(this.token.getUserId()).subscribe(
      result => {
        this.listDiary = result;
      }, error => {
        alert('error get diary');
      }
    );
  }

  getDiaryId(id: string) {
    this.diaryId = id;
  }

  searchByTitle() {
    const searchForm: SearchDiaryByTitleAndUserId = {
      title: this.title,
      id: this.token.getUserId()
    };
    this.diaryService.searchDiaryByTitleAndUserID(searchForm).subscribe(
      result => {
        this.listDiary = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  deleteDiaryById(closeButton: HTMLInputElement) {
    this.diaryService.deleteDiaryById(this.diaryId).subscribe(
      result => {
        closeButton.click();
        this.getDiaryList();
      }, error => {
        console.log(error);
      }
    );
  }

}
