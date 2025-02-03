import { Component } from '@angular/core';
import { ChatbotHeaderComponent } from '../chatbot-header/chatbot-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatbotHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}