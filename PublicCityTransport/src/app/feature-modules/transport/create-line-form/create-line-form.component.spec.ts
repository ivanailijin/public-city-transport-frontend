import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLineFormComponent } from './create-line-form.component';

describe('CreateLineFormComponent', () => {
  let component: CreateLineFormComponent;
  let fixture: ComponentFixture<CreateLineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLineFormComponent]
    });
    fixture = TestBed.createComponent(CreateLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
