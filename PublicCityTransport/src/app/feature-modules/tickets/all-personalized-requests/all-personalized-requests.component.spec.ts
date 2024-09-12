import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonalizedRequestsComponent } from './all-personalized-requests.component';

describe('AllPersonalizedRequestsComponent', () => {
  let component: AllPersonalizedRequestsComponent;
  let fixture: ComponentFixture<AllPersonalizedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPersonalizedRequestsComponent]
    });
    fixture = TestBed.createComponent(AllPersonalizedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
