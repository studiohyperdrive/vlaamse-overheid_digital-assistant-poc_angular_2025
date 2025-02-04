import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovationPremiumComponent } from './renovation-premium.component';

describe('RenovationPremiumComponent', () => {
  let component: RenovationPremiumComponent;
  let fixture: ComponentFixture<RenovationPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovationPremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovationPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
