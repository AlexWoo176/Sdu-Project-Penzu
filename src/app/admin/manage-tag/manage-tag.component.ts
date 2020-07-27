import { Component, OnInit } from '@angular/core';
import {Tag} from '../../model/tag';
import {FormControl, FormGroup} from '@angular/forms';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-manage-tag',
  templateUrl: './manage-tag.component.html',
  styleUrls: ['./manage-tag.component.css']
})
export class ManageTagComponent implements OnInit {

  tagList: Tag[] = [];
  idTag: any;

  tagForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });
  tagName: '';

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getListTag();
  }

  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }
    );
  }

  getTagId(tagId) {
    this.idTag = tagId;
  }

  createTag(closeButon: HTMLButtonElement) {
    const {name} = this.tagForm.value;
    if (name === '') {
      closeButon.click();
      return alert('Name can not empty');
    }
    const tag: Tag = {
      name
    };

    this.tagService.createTag(tag).subscribe(
      result => {
        closeButon.click();
        this.getListTag();
        this.tagForm.reset();
      }
    );
  }

  updateTag(closeModalRef1: HTMLButtonElement) {
    const {name} = this.tagForm.value;
    if (name === '') {
      closeModalRef1.click();
      return alert('Nothing change!');
    }

    const tag: Tag = {
      id: this.idTag ,
      name
    };

    this.tagService.updateTag(tag).subscribe(
      result => {
        closeModalRef1.click();
        this.getListTag();
      }
    );
  }

  deleteTag(closeModalRef2: HTMLButtonElement) {
    this.tagService.deleteTag(this.idTag).subscribe(
      result => {
        this.getListTag();
        closeModalRef2.click();
      }
    );
  }

  searchByTagName() {
    const tag: Tag = {
      name: this.tagName
    };
    this.tagService.searchTagByName(tag).subscribe(
      next => {
        this.tagList = next;
      }
    );
  }

}
