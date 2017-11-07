import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTagComponent } from './media-tag.component';

describe('MediaTagComponent', () => {
  let component: MediaTagComponent;
  let fixture: ComponentFixture<MediaTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
