import { Component } from '@angular/core';
import { ChatbotHeaderComponent } from '../chatbot-header/chatbot-header.component';
import { ChatbotBannerComponent } from '../chatbot-banner/chatbot-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatbotHeaderComponent, ChatbotBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
