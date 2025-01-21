import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { DocumentsComponent } from '../documents/documents.component'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProjectsComponent', () => {
  let component: DocumentsComponent
  let fixture: ComponentFixture<DocumentsComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DocumentsComponent],
    teardown: { destroyAfterEach: false },
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
