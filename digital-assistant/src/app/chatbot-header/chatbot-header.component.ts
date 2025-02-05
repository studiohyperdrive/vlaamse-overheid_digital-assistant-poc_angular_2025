import { Component, Input, OnDestroy, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { SseClient } from 'ngx-sse-client';
import { MatIconModule } from '@angular/material/icon';
import { MockStreamingService } from './stream-endpoint-mock';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chatbot-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './chatbot-header.component.html',
  styleUrls: ['./chatbot-header.component.scss'],
})
export class ChatbotHeaderComponent implements OnInit, OnDestroy {
  isOpen: WritableSignal<boolean> = signal(false);
  userInput: WritableSignal<string> = signal('');
  apiOutput: WritableSignal<string> = signal('');
  chatHistory: { role: string, content: string }[] = [];
  connectionStatus: string = '';
  private eventSourceSubscription: Subscription | null = null;
  @Input() loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private sseClient: SseClient,
    private mockStreamingService: MockStreamingService,
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
    const code = 'hNDZcDo2B:Wy>9GR^^9wF]GH@yj,i_q:EVtoMMCH_6pN6';
    const params = new HttpParams().set('code', code);
    const url = `https://func-vlaamse-ai-assistent-poc-we-001.azurewebsites.net/api/chat/streaming?${params.toString()}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { chatHistory: this.chatHistory };

    // Unsubscribe from any existing SSE connection
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }

    this.eventSourceSubscription = this.sseClient.stream(url, { keepAlive: false, reconnectionDelay: 1_000, responseType: 'event' }, { headers, body }, 'POST')
      .subscribe({
        next: (event: Event) => {
          const messageEvent = event as MessageEvent;
          try {
            const response = JSON.parse(messageEvent.data);
            if (response.content) {
              if (response.role) {
                this.chatHistory.push(response);
              } else {
                const lastMessage = this.chatHistory[this.chatHistory.length - 1];
                lastMessage.content += response.content;
              }
              this.renderTypingEffect(response.content);
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
          if (this.eventSourceSubscription) {
            this.eventSourceSubscription.unsubscribe();
          }
        },
        complete: () => {
          console.info('SSE connection closed');
          if (this.eventSourceSubscription) {
            this.eventSourceSubscription.unsubscribe();
          }
        }
      });
  }

  renderTypingEffect(content: string) {
    const typingElement = document.getElementById('typing');
    if (typingElement) {
      typingElement.innerHTML += content;
    }
  }

  // MOCK STREAM SERVICE
  // sendMessage() {
  //   const message = this.userInput();
  //   const code = 'hNDZcDo2B:Wy>9GR^^9wF]GH@yj,i_q:EVtoMMCH_6pN6'; // Replace with the actual code
  //   const params = new HttpParams().set('code', code);

  //   if (message.trim()) {
  //     this.chatHistory.push({ role: 'user', content: message });
  //     this.userInput.set('');
  //     this.renderMessages();

  //     // Use the mock streaming service instead of the actual HTTP request
  //     this.setupMockSSEConnection();
  //   }
  // }

  // setupMockSSEConnection() {
  //   this.eventSourceSubscription = this.mockStreamingService.stream().subscribe({
  //     next: (response: any) => {
  //       if (response.content) {
  //         if (response.role) {
  //           this.chatHistory.push(response);
  //         } else {
  //           const lastMessage = this.chatHistory[this.chatHistory.length - 1];
  //           lastMessage.content += response.content;
  //         }
  //         this.renderTypingEffect(response.content);
  //       } else {
  //         console.warn('Invalid response data:', response);
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('SSE error:', error);
  //       this.connectionStatus = 'Connection error';
  //     }
  //   });
  // }

  // renderTypingEffect(content: string) {
  //   const typingElement = document.getElementById('typing');
  //   if (typingElement) {
  //     typingElement.innerHTML += content;
  //   }
  // }

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
      return `<div class="message ${alignment}">${message.role}: ${message.content}</div>`;
    }).join('');
    this.apiOutput.set(messages);
  }
}