import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DocumentsComponent } from './documents.component'

describe('ProjectsComponent', () => {
  let component: DocumentsComponent
  let fixture: ComponentFixture<DocumentsComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DocumentsComponent],
    imports: [HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
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
