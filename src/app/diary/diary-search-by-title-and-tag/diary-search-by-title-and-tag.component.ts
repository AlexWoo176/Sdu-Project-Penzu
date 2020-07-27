import {Component, HostListener, OnInit} from '@angular/core';
import {Tag} from '../../model/tag';
import {Diary} from '../../model/diary';
import {TagService} from '../../services/tag.service';
import {DiaryService} from '../../services/diary.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {SearchDiaryByTagAndTitle} from '../../model/search-diary-by-tag-and-title';

@Component({
  selector: 'app-diary-search-by-title-and-tag',
  templateUrl: './diary-search-by-title-and-tag.component.html',
  styleUrls: ['./diary-search-by-title-and-tag.component.css']
})
export class DiarySearchByTitleAndTagComponent implements OnInit {

  listTag: Tag[] = [];
  ListDiary: Diary[] = [];
  tagId = null;
  title = null;
  id: string;
  isShow: boolean;
  topPosToStartShowing = 200;

  constructor(private tagService: TagService,
              private diaryService: DiaryService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getListTag();
    if (this.id === '0') {
      this.searchDiary();
    } else {
      this.getListDiaryByTagId(this.id);
    }

    this.gotoTop();
  }

  getListDiaryByTagId(id: string) {
    if (this.id == null) {
      return;
    } else {
      this.diaryService.searchDiaryByTagId(this.id).subscribe(
        result => {
          this.ListDiary = result;
          this.id = null;
        }
      );
    }
  }

  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.listTag = result;
      }
    );
  }

  searchDiary() {
    const searchForm: SearchDiaryByTagAndTitle = {
      tagId: this.tagId,
      title: this.title
    };
    this.diaryService.searchDiaryByTagAndTitle(searchForm).subscribe(
      result => {
        this.ListDiary = result;
      }
    );
  }

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
