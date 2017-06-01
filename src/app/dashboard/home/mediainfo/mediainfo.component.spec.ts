import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediainfoComponent } from './mediainfo.component';

describe('MediainfoComponent', () => {
  let component: MediainfoComponent;
  let fixture: ComponentFixture<MediainfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediainfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
