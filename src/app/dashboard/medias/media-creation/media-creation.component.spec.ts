import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCreationComponent } from './media-creation.component';

describe('MediaCreationComponent', () => {
  let component: MediaCreationComponent;
  let fixture: ComponentFixture<MediaCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
