import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../model/tag';
import {AlbumService} from '../../services/album.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../services/tag.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Album} from '../../model/album';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  filePath: any;
  fileUpload: File;
  albumForm = new FormGroup({
    title: new FormControl(''),
    tagId: new FormControl(''),
    description: new FormControl('')
  });
  tagList: Tag[] = [];
  redirectID: string;
  processValue = 0;

  constructor(private albumService: AlbumService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    this.getListAllTag();
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

  createAlbum(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, tagId, description} = this.albumForm.value;
    if (description === '' || this.fileUpload == null || tagId === '') {
      return alert('Fill Data Fields !');
    }
    const count = setInterval(() => {
      this.processValue += 11;
      if (this.processValue === 99) {
        clearInterval(count);
      }
    }, 1000);
    openProcessBar.click();
    const album: Album = {
      title,
      description,
      tag: {
        id: tagId
      },
      user: {
        id: this.token.getUserId()
      }
    };

    this.albumService.createAlbum(album).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.albumService.uploadAlbumAvatar(form, result.id).subscribe(
          next => {
            clearInterval(count);
            this.processValue = 100;
            setTimeout(() => {
              console.log('upload file ok');
              closeProcess.click();
              openModalRef.click();
              this.processValue = 0;
              this.redirectID = result.id;
              this.albumForm.reset();
              this.filePath = undefined;
            }, 1000);
          }, error1 => {
            console.log('loi upload file');
          }
        );
      }
    );
  }

  preview(closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/sdu/album-picture-add-image/' + this.redirectID);
  }
}
