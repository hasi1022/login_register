import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistorComponent } from './registor/registor.component';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
