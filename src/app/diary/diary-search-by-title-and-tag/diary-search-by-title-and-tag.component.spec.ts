import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarySearchByTitleAndTagComponent } from './diary-search-by-title-and-tag.component';

describe('DiarySearchByTitleAndTagComponent', () => {
  let component: DiarySearchByTitleAndTagComponent;
  let fixture: ComponentFixture<DiarySearchByTitleAndTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarySearchByTitleAndTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarySearchByTitleAndTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
