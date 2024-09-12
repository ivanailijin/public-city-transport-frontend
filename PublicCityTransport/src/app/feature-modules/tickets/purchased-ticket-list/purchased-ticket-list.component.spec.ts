import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTicketListComponent } from './purchased-ticket-list.component';

describe('PurchasedTicketListComponent', () => {
  let component: PurchasedTicketListComponent;
  let fixture: ComponentFixture<PurchasedTicketListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasedTicketListComponent]
    });
    fixture = TestBed.createComponent(PurchasedTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
