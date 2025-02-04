import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { SseClient } from 'ngx-sse-client';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chatbot-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './chatbot-header.component.html',
  styleUrls: ['./chatbot-header.component.scss']
})
export class ChatbotHeaderComponent implements OnInit, OnDestroy {
  isOpen: WritableSignal<boolean> = signal(false);
  userInput: WritableSignal<string> = signal('');
  apiOutput: WritableSignal<string> = signal('');
  chatHistory: { role: string, content: string }[] = [];
  connectionStatus: string = '';
  private eventSourceSubscription: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private sseClient: SseClient
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
  }

  toggleChat() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage() {
    const message = this.userInput();
    const code = 'hNDZcDo2B:Wy>9GR^^9wF]GH@yj,i_q:EVtoMMCH_6pN6'; // Replace with the actual code
    const params = new HttpParams().set('code', code);

    if (message.trim()) {
      this.chatHistory.push({ role: 'user', content: message });
      this.userInput.set('');
      this.renderMessages();

      const url = `https://func-vlaamse-ai-assistent-poc-we-001.azurewebsites.net/api/chat?${params.toString()}`; // Replace with actual URL
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { chatHistory: this.chatHistory };

      this.http.post(url, body, { headers }).subscribe({
        next: () => {
          this.setupSSEConnection();
        },
        error: (error) => {
          console.error('HTTP error:', error);
          this.connectionStatus = 'Connection error';
        }
      });
    }
  }

  setupSSEConnection() {
    const code = 'hNDZcDo2B:Wy>9GR^^9wF]GH@yj,i_q:EVtoMMCH_6pN6'; // Replace with the actual code
    const params = new HttpParams().set('code', code);
    const url = `https://func-vlaamse-ai-assistent-poc-we-001.azurewebsites.net/api/chat/streaming?${params.toString()}`; // Replace with actual URL

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatHistory: this.chatHistory };

    this.eventSourceSubscription = this.sseClient.stream(url, { keepAlive: true, reconnectionDelay: 1000, responseType: 'event' }, { headers, body }, 'POST')
      .subscribe({
        next: (event: Event) => {
          const messageEvent = event as MessageEvent;
          console.info(`SSE request with data "${messageEvent.data}"`);
          try {
            const response = JSON.parse(messageEvent.data);
            if (response.content) {
              if (response.role) {
                this.chatHistory.push(response);
              } else {
                const lastMessage = this.chatHistory[this.chatHistory.length - 1];
                lastMessage.content += response.content;
              }
              this.renderMessages();
            } else {
              console.warn('Invalid response data:', response);
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error);
          }
        },
        error: (error: any) => {
          console.error('SSE error:', error);
          this.connectionStatus = 'Connection error';
        }
      });
  }

  setQuestion(question: string) {
    this.userInput.set(question);
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput.set(inputElement.value);
  }

  renderMessages() {
    const messages = this.chatHistory.map(message => {
      const alignment = message.role === 'user' ? 'right' : 'left';
      return `<li class="message ${alignment}">${message.role}: ${message.content}</li>`;
    }).join('');
    this.apiOutput.set(messages);
  }
}