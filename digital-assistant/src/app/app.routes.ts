import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SintNiklaasComponent } from './sint-niklaas/sint-niklaas.component';
import { RenovationPremiumComponent } from './renovation-premium/renovation-premium.component';
import { RenovationPremiumSimulationComponent } from './renovation-premium-simulation/renovation-premium-simulation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sint-niklaas', component: SintNiklaasComponent },
    { path: 'renovatie-premies', component: RenovationPremiumComponent },
    { path: 'verbouw-premie-sim', component: RenovationPremiumSimulationComponent }
];
