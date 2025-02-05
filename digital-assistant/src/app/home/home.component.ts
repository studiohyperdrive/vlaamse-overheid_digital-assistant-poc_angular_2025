import { Component, signal, WritableSignal } from '@angular/core';
import { ChatbotHeaderComponent } from '../chatbot-header/chatbot-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatbotHeaderComponent],
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
