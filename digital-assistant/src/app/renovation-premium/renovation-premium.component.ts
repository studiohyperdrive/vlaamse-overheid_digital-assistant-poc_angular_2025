import { Component, Input, HostListener } from '@angular/core';
import { ChatbotBannerComponent } from "../chatbot-banner/chatbot-banner.component";
import { ChatbotHeaderComponent } from '../chatbot-header/chatbot-header.component';

@Component({
  selector: 'app-renovation-premium',
  imports: [ChatbotBannerComponent, ChatbotHeaderComponent],
  templateUrl: './renovation-premium.component.html',
  styleUrl: './renovation-premium.component.scss'
})
export class RenovationPremiumComponent {
  @Input() public ready: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const targetPosition = 600;

    if (scrollPosition >= targetPosition) {
      this.ready = true;
    }
  }
}
