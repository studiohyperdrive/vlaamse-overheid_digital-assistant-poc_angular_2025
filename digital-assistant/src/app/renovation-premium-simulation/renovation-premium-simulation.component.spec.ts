import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovationPremiumSimulationComponent } from './renovation-premium-simulation.component';

describe('RenovationPremiumSimulationComponent', () => {
  let component: RenovationPremiumSimulationComponent;
  let fixture: ComponentFixture<RenovationPremiumSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovationPremiumSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovationPremiumSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
