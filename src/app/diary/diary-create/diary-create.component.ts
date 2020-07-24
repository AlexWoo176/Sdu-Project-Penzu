import {Component, OnInit} from '@angular/core';
import {Tag} from '../../model/tag';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {DiaryService} from '../../services/diary.service';
import {TagService} from '../../services/tag.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Diary} from '../../model/diary';

@Component({
  selector: 'app-diary-create',
  templateUrl: './diary-create.component.html',
  styleUrls: ['./diary-create.component.css']
})
export class DiaryCreateComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: string;
  public tagList: Tag[] = [];
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
    file: new FormControl(''),
  });
  returnUrl: string;
  filePath: any;
  processValue = 0;

  constructor(private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error0 => {
        alert('error get manage-tag');
      }
    );

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/diary/listUserDiary';
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }


  createDiary(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, description, content, tagId} = this.formDiary.value;

    if (title === '' || description === '' || content === '' || tagId === '' || this.fileUpload == null) {
      return alert('Fill Data Fields !');
    }

    const count = setInterval(() => {
      this.processValue += 11;
      if (this.processValue === 99) {
        clearInterval(count);
      }
    }, 1000);
    openProcessBar.click();

    const diary: Diary = {
      title,
      description,
      content,
      user: {
        id: this.info.userId
      },
      tag: {
        id: tagId
      }
    };

    console.log(diary);
    this.diaryService.createDiary(diary).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.diaryService.uploadFile(form, result.id).subscribe(
          next => {
            clearInterval(count);
            this.processValue = 100;

            setTimeout(() => {
              console.log('upload file ok');
              closeProcess.click();
              openModalRef.click();
              this.processValue = 0;
              this.previewId = result.id;
              this.formDiary.reset();
              this.filePath = undefined;
            }, 1000);
          }, error1 => {
            console.log('loi upload file');
          }
        );
      }, error5 => {
        return console.log('fail create diary');
      }
    );
  }

  preview(closeButton: HTMLInputElement) {
    closeButton.click();
    return this.router.navigateByUrl('/diary/' + this.previewId);
  }

}
