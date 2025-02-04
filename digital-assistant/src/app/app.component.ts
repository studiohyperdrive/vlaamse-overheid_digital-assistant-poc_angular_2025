import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SintNiklaasComponent } from "./sint-niklaas/sint-niklaas.component";
import { RenovationPremiumComponent } from './renovation-premium/renovation-premium.component';
import { RenovationPremiumSimulationComponent } from './renovation-premium-simulation/renovation-premium-simulation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, SintNiklaasComponent, RenovationPremiumComponent, RenovationPremiumSimulationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
