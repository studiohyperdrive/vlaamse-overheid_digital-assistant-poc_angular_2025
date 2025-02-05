import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

enum ButtonType {
  GoToSimulation, AutoFill
}

@Component({
  selector: 'app-chatbot-banner',
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './chatbot-banner.component.html',
  styleUrl: './chatbot-banner.component.scss'
})
export class ChatbotBannerComponent {
  @Input() public bannerText: string = '';
  @Input() public buttonType: ButtonType | null = null;
  @Input() public buttonVisible: boolean = true;
  @Output() public selected: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectOption() {
    this.selected.emit(true);
  }
}
