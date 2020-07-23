import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiaryComponent } from './manage-diary.component';

describe('ManageDiaryComponent', () => {
  let component: ManageDiaryComponent;
  let fixture: ComponentFixture<ManageDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
