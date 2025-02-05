import { Component, signal, WritableSignal } from '@angular/core';
import { ChatbotHeaderComponent } from '../chatbot-header/chatbot-header.component';
import { ChatbotBannerComponent } from '../chatbot-banner/chatbot-banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatbotHeaderComponent, ChatbotBannerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loggedIn: WritableSignal<boolean> = signal(false);

  login() {
    if(this.loggedIn()) {
      this.loggedIn.set(false);
    } else {
      this.loggedIn.set(true);
    }
    console.log(this.loggedIn());
  }
}
