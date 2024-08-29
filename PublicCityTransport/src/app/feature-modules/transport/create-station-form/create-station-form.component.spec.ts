import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStationFormComponent } from './create-station-form.component';

describe('CreateStationFormComponent', () => {
  let component: CreateStationFormComponent;
  let fixture: ComponentFixture<CreateStationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStationFormComponent]
    });
    fixture = TestBed.createComponent(CreateStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
