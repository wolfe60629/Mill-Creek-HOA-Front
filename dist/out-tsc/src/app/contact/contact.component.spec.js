import { TestBed, waitForAsync } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
describe('ContactComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ContactComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it(`should have a not empty contact information`, waitForAsync(() => {
        const contactsComponent = fixture.debugElement.componentInstance;
        expect(contactsComponent.contacts).toBeDefined(0);
        expect(contactsComponent.contacts.length).toBeGreaterThan(0);
    }));
});
//# sourceMappingURL=contact.component.spec.js.map