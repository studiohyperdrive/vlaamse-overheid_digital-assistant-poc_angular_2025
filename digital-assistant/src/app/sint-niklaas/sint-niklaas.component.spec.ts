import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SintNiklaasComponent } from './sint-niklaas.component';

describe('SintNiklaasComponent', () => {
  let component: SintNiklaasComponent;
  let fixture: ComponentFixture<SintNiklaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SintNiklaasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SintNiklaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
