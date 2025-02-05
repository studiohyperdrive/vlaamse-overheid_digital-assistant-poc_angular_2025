import { Component, Input, OnInit } from '@angular/core';
import { ChatbotBannerComponent } from "../chatbot-banner/chatbot-banner.component";

@Component({
  selector: 'app-renovation-premium',
  imports: [ChatbotBannerComponent],
  templateUrl: './renovation-premium.component.html',
  styleUrl: './renovation-premium.component.scss'
})
export class RenovationPremiumComponent implements OnInit {
  @Input() public ready: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.ready = true;
    }, 3000);
  }
}
