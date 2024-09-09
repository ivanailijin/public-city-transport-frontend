import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineProfileComponent } from './line-profile.component';

describe('LineProfileComponent', () => {
  let component: LineProfileComponent;
  let fixture: ComponentFixture<LineProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineProfileComponent]
    });
    fixture = TestBed.createComponent(LineProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
