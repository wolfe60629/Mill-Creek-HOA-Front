import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
describe('HomeComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it(`should have as titleName 'David'`, waitForAsync(() => {
        const home = fixture.debugElement.componentInstance;
        expect(home.titleName).toEqual('David');
    }));
});
//# sourceMappingURL=home.component.spec.js.map