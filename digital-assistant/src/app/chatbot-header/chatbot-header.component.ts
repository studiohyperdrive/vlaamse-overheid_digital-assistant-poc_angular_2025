import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-header.component.html',
  styleUrls: ['./chatbot-header.component.scss']
})
export class ChatbotHeaderComponent {
  isOpen: WritableSignal<boolean> = signal(false);
  userInput: WritableSignal<string> = signal('');

  toggleChat() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage() {
    const message = this.userInput();
    if (message.trim()) {
      console.log('Sending message:', message);

      fetch('https://your-api.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      .then(response => response.json())
      .then(data => console.log('Response:', data))
      .catch(error => console.error('Error:', error));

      this.userInput.set('');
    }
  }

  setQuestion(question: string) {
    this.userInput.set(question);
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput.set(inputElement.value);
  }
}