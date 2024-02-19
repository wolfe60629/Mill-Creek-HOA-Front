import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterUploadComponent } from './newsletter-upload.component';

describe('NewsletterUploadComponent', () => {
  let component: NewsletterUploadComponent;
  let fixture: ComponentFixture<NewsletterUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
