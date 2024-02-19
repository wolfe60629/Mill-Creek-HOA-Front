import { TestBed, waitForAsync } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
describe('FooterComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it(`should have as year the current year`, waitForAsync(() => {
        const footer = fixture.debugElement.componentInstance;
        const currentDate = new Date().getFullYear();
        expect(footer.year).toEqual(currentDate);
    }));
});
//# sourceMappingURL=footer.component.spec.js.map