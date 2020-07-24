import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from '../../services/album.service';
import {TagService} from '../../services/tag.service';
import {Album} from '../../model/album';
import {Tag} from '../../model/tag';
import {Image} from '../../model/image';

@Component({
  selector: 'app-album-add-image',
  templateUrl: './album-add-image.component.html',
  styleUrls: ['./album-add-image.component.css']
})
export class AlbumAddImageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private albumService: AlbumService,
              private tagService: TagService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.albumId = params.id;
    });
  }
  urls = [];
  fileList = [];
  albumId: string;
  album: Album;
  filePath: any;
  imageId: string;
  tagId = '';
  fileUpload: File;
  tagList: Tag[] = [];
  imageList: Image[] = [];
  processValue = 0;

  ngOnInit() {
    console.log(this.albumId);
    this.getAlbumById();
    this.getListAllTag();
    this.getAllImageOfAlbum();
  }

  getAllImageOfAlbum() {
    this.albumService.getListImageByAlbumId(this.albumId).subscribe(
      result => {
        this.imageList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getAlbumById() {
    this.albumService.getAlbumById(this.albumId).subscribe(
      result => {
        this.album = result;
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

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  updateAlbum(openModalRef: HTMLButtonElement) {
    if (this.album.description === '' || this.album.title === '') {
      alert('Fill Data Fields !');
    }
    if ( this.tagId === '') {
      this.tagId = this.album.tag.id;
    }

    const formAlbum: Album = {
      id: this.album.id,
      title: this.album.title,
      tag: {
        id: this.tagId
      },
      description: this.album.description
    };

    this.albumService.updateAlbum(formAlbum).subscribe(
      result => {
        if (this.fileUpload === null || this.fileUpload === undefined ) {
          console.log('update album no update avatar ok');
          openModalRef.click();
        } else {
          const form = new FormData();
          form.append('file', this.fileUpload);
          this.albumService.uploadAlbumAvatar(form, result.id).subscribe(
            next => {
              openModalRef.click();
              console.log('upload file ok');
            }, error1 => {
              console.log('loi upload file');
            }
          );
        }
      }, error => {
        console.log(error);
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.fileList.push(event.target.files.item(i));
        const reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(this.fileList);
          console.log(this.urls);
          this.urls.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removePreviewImage(i: number) {
    this.urls.splice(i, 1);
    this.fileList.splice(i, 1);
    console.log(this.fileList);
    console.log(this.urls);
  }

  uploadImageOfAlbum(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    if ( this.fileList.length > 0) {
      const count = setInterval(() => {
        this.processValue += 3;
        if (this.processValue === 99) {
          clearInterval(count);
        }
      }, 1000);
      openProcessBar.click();
      console.log(this.fileList);
      const form = new FormData();
      for (const file of this.fileList) {
        form.append('files', file);
      }

      this.albumService.uploadAlbumImage(form, this.album.id).subscribe(
        result => {
          clearInterval(count);
          this.processValue = 100;
          console.log(result);
          this.urls = [];
          this.fileList = [];
          setTimeout(() => {
            this.processValue = 0;
            closeProcess.click();
            this.getAllImageOfAlbum();
            this.updateAlbum(openModalRef);
          }, 3000);
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.updateAlbum(openModalRef);
    }
  }

  getImageId(id: string) {
    this.imageId = id;
  }

  deleteImage(closeModalRef1: HTMLButtonElement) {
    console.log(this.imageId);
    this.albumService.deleteImageById(this.imageId).subscribe(
      result => {
        this.getAllImageOfAlbum();
        closeModalRef1.click();
      }, error => {
        console.log(error);
      }
    );
  }

  preview(closeModalRef: HTMLButtonElement) {
    closeModalRef.click();
    return this.router.navigateByUrl('/album-detail/' + this.album.id);
  }
}
