import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUploadComponent } from './request-upload.component';

describe('RequestUploadComponent', () => {
  let component: RequestUploadComponent;
  let fixture: ComponentFixture<RequestUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
