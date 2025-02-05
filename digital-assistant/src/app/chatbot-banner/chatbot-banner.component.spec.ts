import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotBannerComponent } from './chatbot-banner.component';

describe('ChatbotBannerComponent', () => {
  let component: ChatbotBannerComponent;
  let fixture: ComponentFixture<ChatbotBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
