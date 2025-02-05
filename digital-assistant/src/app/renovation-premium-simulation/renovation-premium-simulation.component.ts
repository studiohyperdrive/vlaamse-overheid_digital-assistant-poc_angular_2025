import { Component } from '@angular/core';
import { ChatbotBannerComponent } from "../chatbot-banner/chatbot-banner.component";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-renovation-premium-simulation',
  imports: [ChatbotBannerComponent, MatIcon],
  templateUrl: './renovation-premium-simulation.component.html',
  styleUrl: './renovation-premium-simulation.component.scss'
})
export class RenovationPremiumSimulationComponent {
  public selected: boolean = false;

  onBannerSelected(selected: boolean) {
    this.selected = selected;
  }
}
