import { Component, OnInit } from '@angular/core';
import {Diary} from '../../model/diary';
import {DiaryService} from '../../services/diary.service';
import {SearchDiaryByTitle} from '../../model/search-diary-by-title';

@Component({
  selector: 'app-manage-diary',
  templateUrl: './manage-diary.component.html',
  styleUrls: ['./manage-diary.component.css']
})
export class ManageDiaryComponent implements OnInit {

  listDiary: Diary[] = [];
  diaryId: string;
  titleInput = '';
  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
    this.getListDiary();
  }

  getListDiary() {
    this.diaryService.getListDiary().subscribe(
      result => {
        this.listDiary = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getDiaryId(id: string) {
    this.diaryId = id;
  }

  deleteDiaryById(closeModalRef: HTMLButtonElement) {
    this.diaryService.deleteDiaryById(this.diaryId).subscribe(
      result => {
        closeModalRef.click();
        this.getListDiary();
      }, error => {
        console.log(error);
      }
    );
  }

  searchByTitle() {
    const title: SearchDiaryByTitle = {
      title: this.titleInput
    };
    this.diaryService.searchDiaryByTitle(title).subscribe(
      result => {
        this.listDiary = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }
}
