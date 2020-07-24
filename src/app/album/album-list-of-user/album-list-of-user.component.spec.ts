import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListOfUserComponent } from './album-list-of-user.component';

describe('AlbumListOfUserComponent', () => {
  let component: AlbumListOfUserComponent;
  let fixture: ComponentFixture<AlbumListOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
