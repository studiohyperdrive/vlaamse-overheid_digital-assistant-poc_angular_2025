import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SintNiklaasComponent } from "./sint-niklaas/sint-niklaas.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, SintNiklaasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
