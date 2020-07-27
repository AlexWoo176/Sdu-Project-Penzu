import {Component, OnInit} from '@angular/core';
import {Album} from '../../model/album';
import {Tag} from '../../model/tag';
import {AlbumService} from '../../services/album.service';
import {TagService} from '../../services/tag.service';
import {SearchAlbumByTagIdAndTitle} from '../../model/search-album-by-tag-id-and-title';

const STATUS_KEY = 'StatusAlbum';
const TEXT_KEY = 'KeyText';

@Component({
  selector: 'app-album-main',
  templateUrl: './album-main.component.html',
  styleUrls: ['./album-main.component.css']
})
export class AlbumMainComponent implements OnInit {

  albumList: Album[] = [];
  tagList: Tag[] = [];
  isNew: 'true';
  sort: string;
  textStatus = '';
  tagId = null;
  title = null;
  slideAlbum: Album[] = [];
  p: any;

  constructor(private albumService: AlbumService,
              private tagService: TagService) {
    this.sort = window.sessionStorage.getItem(STATUS_KEY);
    if (window.sessionStorage.getItem(TEXT_KEY) != null) {
      this.textStatus = window.sessionStorage.getItem(TEXT_KEY);
    }
  }

  ngOnInit() {
    this.getAllAlbum();
    this.getListAllTag();
    this.getListAllAlbumForSlide();
  }

  getListAllAlbumForSlide() {
    this.albumService.getListALlAlbum().subscribe(
      result => {
        this.slideAlbum = result;
      }
    );
  }

  getListAllTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }
    );
  }

  sortAlbumByDate() {
    if (this.isNew === undefined || this.isNew == null) {
      return;
    }
    if (this.isNew === 'true') {
      window.sessionStorage.removeItem(TEXT_KEY);
      window.sessionStorage.setItem(TEXT_KEY, 'Newest');
    } else if (this.isNew === 'false') {
      window.sessionStorage.removeItem(TEXT_KEY);
      window.sessionStorage.setItem(TEXT_KEY, 'Oldest');
    }
    window.sessionStorage.removeItem(STATUS_KEY);
    window.sessionStorage.setItem(STATUS_KEY, this.isNew);
    window.location.reload();
  }


  getAllAlbum() {
    if (this.sort == null || this.sort === 'true') {
      this.albumService.getListAlbumAndSortingByDateDESC().subscribe(
        result => {
          if (result === null) {
            return;
          } else {
            this.albumList = result.content;
          }
        }
      );
    } else {
      this.albumService.getListAlbumAndSortingByDateASC().subscribe(
        result => {
          if (result === null) {
            return;
          } else {
            this.albumList = result.content;
          }
        }
      );
    }
  }

  goToMidle() {
    window.scroll({
      top: 700,
      left: 0,
      behavior: 'smooth'
    });
  }

  getListAlbumByTagIdAndTitle() {
    const searchForm: SearchAlbumByTagIdAndTitle = {
      tagId: this.tagId,
      title: this.title
    };

    this.albumService.searchAlbumByTagIdAndTitle(searchForm).subscribe(
      result => {
        this.albumList = result;
      }
    );
  }

}
