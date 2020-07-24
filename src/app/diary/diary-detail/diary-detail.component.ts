import {Component, HostListener, OnInit} from '@angular/core';
import {Diary} from '../../model/diary';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {DiaryService} from '../../services/diary.service';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.css']
})
export class DiaryDetailComponent implements OnInit {

  diaryId: string;
  userId: string;
  diary: Diary;
  currentRate = 6;
  isShow: boolean;
  topPosToStartShowing = 200;
  formCommentCreate = new FormGroup({
    contentInput: new FormControl('')
  });
  contentUpdate = new FormControl();
  listComment: Comment[] = [];
  idComment: string;
  tokenJWT: string;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private sanitizer: DomSanitizer,
              private commentService: CommentService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.diaryId = params.id;
    });

    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit() {
    console.log(this.diaryId, this.token.getUserId());
    this.getDiaryById();
    this.getAllCommentThisDiary();
    this.gotoTop();
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

  getDiaryById() {
    this.diaryService.findDiaryById(this.diaryId).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
        console.log('Get diary success');
      }, error => {
        console.log('Fail get diary');
      }
    );
  }

  getAllCommentThisDiary() {
    this.commentService.getAllCommentByDiaryId(this.diaryId).subscribe(
      result => {
        this.listComment = result;
      }, error => {
        console.log(error);
      }
    );
  }

  createComment() {
    const {contentInput} = this.formCommentCreate.value;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
      return;
    }
    const comment: Comment = {
      idDiary: this.diaryId,
      content: contentInput,
      user: {
        id: this.token.getUserId()
      }
    };
    this.commentService.createComment(comment).subscribe(
      result => {
        console.log(result, 'ok');
        this.formCommentCreate.reset();
        this.getAllCommentThisDiary();
      }, error => {
        console.log(error);
      }
    );
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisDiary();
    this.contentUpdate.reset();
  }

  updateComment(commentId: string, closeModalRef: HTMLAnchorElement) {
    if (this.contentUpdate.value === null || this.contentUpdate.value === '' || this.contentUpdate.value === undefined) {
      return this.closeForm(closeModalRef);
    }
    const comment: Comment = {
      id: commentId,
      content: this.contentUpdate.value
    };
    this.commentService.editComment(comment).subscribe(
      result => {
        this.closeForm(closeModalRef);
      }, error => {
        console.log(error);
      }
    );
    console.log(comment);
  }

  getIdComment(id: string) {
    this.idComment = id;
  }

  deleteComment(closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(this.idComment).subscribe(
      result => {
        this.getAllCommentThisDiary();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
  }
}
