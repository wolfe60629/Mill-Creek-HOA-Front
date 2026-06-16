import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { NavigationComponent } from './navigation.component'

import { RouterTestingModule } from '@angular/router/testing'

describe('NavigationComponent', () => {
  let component: NavigationComponent
  let fixture: ComponentFixture<NavigationComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should expose main navigation links', () => {
    expect(component.mainLinks.length).toBeGreaterThan(0);
    expect(component.mainLinks.some(link => link.label === 'Contact')).toBeTrue();
  });
})
