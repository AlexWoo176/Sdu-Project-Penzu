import { Component, OnInit } from '@angular/core';
import {Album} from '../../model/album';
import {AlbumService} from '../../services/album.service';
import {FindAlbumsByTitle} from '../../model/find-albums-by-title';

@Component({
  selector: 'app-manage-album',
  templateUrl: './manage-album.component.html',
  styleUrls: ['./manage-album.component.css']
})
export class ManageAlbumComponent implements OnInit {

  albumList: Album[] = [];
  albumId: string;
  title = '';

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.getAllAlbum();
  }

  getAllAlbum() {
    this.albumService.getListALlAlbum().subscribe(
      result => {
        this.albumList = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  getAlbumId(id: string) {
    this.albumId = id;
  }

  deleteAlbum(closeModalRef2: HTMLButtonElement) {
    this.albumService.deleteAlbumById(this.albumId).subscribe(
      result => {
        this.getAllAlbum();
        closeModalRef2.click();
      }, error =>  {
        console.log(error);
      }
    );
  }

  searchByTitle() {
    const titleForm: FindAlbumsByTitle = {
      title: this.title
    };
    this.albumService.findAlbumsByTitle(titleForm).subscribe(
      result => {
        this.albumList = result;
      }, error => {
        console.log(error);
      }
    );
  }

}
