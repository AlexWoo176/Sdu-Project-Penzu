import { Component, OnInit } from '@angular/core';
import {Diary} from '../../model/diary';
import {DiaryService} from '../../services/diary.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.css']
})
export class BlogMainComponent implements OnInit {

  diaryList: Diary[] = [];
  page = 0;
  loadText = 'Load More';

  constructor(private diaryService: DiaryService) {
  }

  ngOnInit() {
    this.Pagination(this.page);
  }

  Pagination(page: number) {
    this.diaryService.getListDiaryAndPaginationDESC(page).subscribe(
      result => {
        if (result === null) {
          return;
        } else {
          this.diaryList = result.content;
          this.page++;
        }
      }
    );
  }

  loadMore() {
    this.diaryService.getListDiaryAndPaginationDESC(this.page).subscribe(
      result => {
        if (result == null) {
          return this.loadText = 'Out of Blog';
        } else {
          this.diaryList = this.diaryList.concat(result.content);
          this.page++;
        }
      }
    );
  }
}
