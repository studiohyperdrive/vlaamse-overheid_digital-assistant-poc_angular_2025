import { Component, OnInit } from '@angular/core';
import { ChatbotBannerComponent } from "../chatbot-banner/chatbot-banner.component";
import { MatIcon } from '@angular/material/icon';
import { AutoFillAssistentMessageComponent } from '../auto-fill-assistent-message/auto-fill-assistent-message.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-renovation-premium-simulation',
  imports: [ChatbotBannerComponent, MatIcon, AutoFillAssistentMessageComponent],
  templateUrl: './renovation-premium-simulation.component.html',
  styleUrl: './renovation-premium-simulation.component.scss'
})
export class RenovationPremiumSimulationComponent implements OnInit {
  public selected: boolean = false;
  public tooltipActive: boolean = false;
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute) {}

  onBannerSelected(selected: boolean) {
    this.selected = selected;
  }

  onTooltipClick() {
    this.tooltipActive = !this.tooltipActive;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loggedIn = params['loggedIn'] === 'true';
    });
  }
}
