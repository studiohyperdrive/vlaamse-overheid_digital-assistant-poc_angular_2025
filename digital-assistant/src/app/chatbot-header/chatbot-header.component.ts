import { Component, ElementRef, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { SseClient } from 'ngx-sse-client';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ReversePipe } from '../pipes/reverse';

@Component({
  selector: 'app-chatbot-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, MarkdownModule, ReversePipe],
  templateUrl: './chatbot-header.component.html',
  styleUrls: ['./chatbot-header.component.scss'],
})

export class ChatbotHeaderComponent implements OnInit, OnDestroy {
  @Input() loggedIn: boolean = false;

  presetQuestions = [{
    icon: 'euro',
    description: 'Je zocht onlangs info op over de jobbonus. Wil je hier mee verder gaan?',
    question: 'Hoe kan ik mijn jobbonus claimen?',
  }, {
    icon: 'calendar_today',
    description: 'Vind leuke activiteiten in Sint-Niklaas dit weekend.',
    question: 'Wat kan ik dit weekend doen in Sint-Niklaas?',
  }];
  currentMessage: string = '';
  isOpen: WritableSignal<boolean> = signal(false);
  userInput: WritableSignal<string> = signal('');
  apiOutput: WritableSignal<string> = signal('');
  chatHistory: { role: string, content: string }[] = [];
  lastMessage: string = '';
  connectionStatus: string = '';
  typing: boolean = false;
  private eventSourceSubscription: Subscription | null = null;
  private messageTimeoutSubscription: Subscription | null = null;
  private readonly MESSAGE_TIMEOUT = 1000;

  constructor(
    private http: HttpClient,
    private sseClient: SseClient,
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

  sendMessage(preset?: string) {
    const message = preset ? preset : this.userInput();
    const code = 'hNDZcDo2B:Wy>9GR^^9wF]GH@yj,i_q:EVtoMMCH_6pN6'; // Replace with the actual code
    const params = new HttpParams().set('code', code);

    if (message.trim()) {
      this.chatHistory.push({ role: 'user', content: message });
      this.userInput.set('');
      this.renderMessages();

      this.typing = true;

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

    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }

    this.eventSourceSubscription = this.sseClient.stream(
      url,
      { keepAlive: false, reconnectionDelay: 1000, responseType: 'event' },
      { headers, body },
      'POST'
    ).subscribe({
      next: (event: Event) => {
        if (this.typing) {
          this.typing = false;
        }

        const messageEvent = event as MessageEvent;
        try {
          const response = this.parseJSON(messageEvent?.data);

          if (response?.content) {
            this.lastMessage += response.content;
          }

          // Reset the message timeout timer
          this.resetMessageTimeout();
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      },
      error: (error: any) => {
        console.error('SSE error:', error);
        this.connectionStatus = 'Connection error';
        this.clearMessageTimeout();
      },
      complete: () => {
        this.finalizeMessage();
      }
    });

    // Start the initial message timeout timer
    this.resetMessageTimeout();
  }

  renderTypingEffect(content: string) {
    const typingElement = document.getElementById('typing');
    if (typingElement) {
      typingElement.innerHTML += content;
    }
  }

  setQuestion(question: string) {
    this.userInput.set(question);
  }

  sendPresetQuestion(question: string) {
    this.sendMessage(question)
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput.set(inputElement.value);
  }

  renderMessages() {
    this.chatHistory = [...this.chatHistory];
  }

  private parseJSON(data: unknown): { content: string } {
    try {
      return JSON.parse(data as string);
    } catch (e) {
      console.error(e);

      return {
        content: '',
      };
    }
  }

  private resetMessageTimeout() {
    // Clear the existing timer
    if (this.messageTimeoutSubscription) {
      this.messageTimeoutSubscription.unsubscribe();
    }

    // Start a new timer
    this.messageTimeoutSubscription = timer(this.MESSAGE_TIMEOUT).subscribe(() => {
      this.finalizeMessage();
    });
  }

  private clearMessageTimeout() {
    if (this.messageTimeoutSubscription) {
      this.messageTimeoutSubscription.unsubscribe();
      this.messageTimeoutSubscription = null;
    }
  }

  private finalizeMessage() {
    if (this.typing) {
      this.typing = false;
    }

    if (this.lastMessage) {
      this.chatHistory = this.chatHistory.concat({ role: 'assistant', content: this.lastMessage });
      this.lastMessage = '';
    }
    this.clearMessageTimeout();
  }
}