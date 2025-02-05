import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFillAssistentMessageComponent } from './auto-fill-assistent-message.component';

describe('AutoFillAssistentMessageComponent', () => {
  let component: AutoFillAssistentMessageComponent;
  let fixture: ComponentFixture<AutoFillAssistentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoFillAssistentMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFillAssistentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
