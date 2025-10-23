import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) { }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
