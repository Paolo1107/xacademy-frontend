import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { HealthComponent } from './pages/health/health.component';
import { PlayersComponent } from './pages/players/players.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'health', component: HealthComponent, canActivate: [authGuard] },
    { path: 'players', component: PlayersComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
    { path: 'players/:id', component: PlayerDetailComponent, canActivate: [authGuard] }
];

