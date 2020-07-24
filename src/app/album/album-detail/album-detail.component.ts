import {Component, HostListener, OnInit} from '@angular/core';
import {Album} from '../../model/album';
import {Image} from '../../model/image';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from '../../services/album.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  albumId: string;
  isShow: boolean;
  topPosToStartShowing = 200;
  album: Album;
  listImage: Image[] = [];
  currentRate = 6;
  formCommentCreate = new FormGroup( {
    contentInput: new FormControl('')
  });
  contentUpdate = new FormControl();
  listComment: Comment[] = [];
  userId: string;
  tokenJWT: string;
  idComment: string;

  constructor(private router: Router,
              private albumService: AlbumService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private commentService: CommentService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.albumId = params.id;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit() {
    console.log(this.albumId);
    this.gotoTop();
    this.getAlbumById();
    this.getAllImageByAlbumId();
    this.getAllCommentThisAlbum();
  }

  getAlbumById() {
    this.albumService.getAlbumById(this.albumId).subscribe(
      result => {
        this.album = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getAllImageByAlbumId() {
    this.albumService.getListImageByAlbumId(this.albumId).subscribe(
      result => {
        this.listImage = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getAllCommentThisAlbum() {
    this.commentService.getAllCommentByAlbumId(this.albumId).subscribe(
      result => {
        this.listComment = result;
      }, error => {
        console.log(error);
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
  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllImageByAlbumId();
    this.contentUpdate.reset();
  }

  createComment() {
    const {contentInput} = this.formCommentCreate.value;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
      return;
    }
    const comment: Comment = {
      idAlbum: this.albumId ,
      content: contentInput,
      user: {
        id: this.token.getUserId()
      }
    };
    this.commentService.createComment(comment).subscribe(
      result => {
        console.log(result , 'ok');
        this.getAllCommentThisAlbum();
        this.formCommentCreate.reset();
      }, error => {
        console.log(error);
      }
    );
  }

  getIdComment1(id: string) {
    this.idComment = id;
  }
  closeForm1(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisAlbum();
    this.contentUpdate.reset();
  }

  updateComment1(commentId: string, closeModalRef: HTMLAnchorElement) {
    if (this.contentUpdate.value === null || this.contentUpdate.value === '' || this.contentUpdate.value === undefined) {
      return this.closeForm(closeModalRef);
    }
    const comment: Comment = {
      id: commentId ,
      content: this.contentUpdate.value
    };
    this.commentService.editComment(comment).subscribe(
      result => {
        this.closeForm1(closeModalRef);
      }, error => {
        console.log(error);
      }
    );
    console.log(comment);
  }

  deleteComment1(closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(this.idComment).subscribe(
      result => {
        this.getAllCommentThisAlbum();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
  }

}
