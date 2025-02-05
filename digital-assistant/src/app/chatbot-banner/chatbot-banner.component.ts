import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chatbot-banner',
  imports: [MatIcon],
  templateUrl: './chatbot-banner.component.html',
  styleUrl: './chatbot-banner.component.scss'
})
export class ChatbotBannerComponent {
  @Input() public bannerText: string = '';
  @Input() public hasButton: boolean = false;
}
