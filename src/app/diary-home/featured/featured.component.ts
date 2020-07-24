import { Component, OnInit } from '@angular/core';
import {DiaryService} from '../../services/diary.service';
import {Diary} from '../../model/diary';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  diaryList: Diary[];
  images: string[];
  constructor(private diaryService: DiaryService) {
  }

  ngOnInit() {
    this.getDiaryList();
  }

  getDiaryList() {
    this.diaryService.getListDiary().subscribe(
      result => {
        this.diaryList = result;
      }
    );
  }
}
