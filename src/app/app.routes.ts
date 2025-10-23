import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { HealthComponent } from './pages/health/health.component';
import { PlayersComponent } from './pages/players/players.component';
import { authGuard } from './core/auth/auth.guard';
import { MyPlayersComponent } from './pages/my-players/my-players.component';
import { MyPlayerFormComponent } from './pages/my-player-form/my-player-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'health', component: HealthComponent, canActivate: [authGuard] },
    { path: 'players', component: PlayersComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
    { path: 'players/:id', component: PlayerDetailComponent, canActivate: [authGuard] },
    { path: 'my-players', component: MyPlayersComponent, canActivate: [authGuard] },
    { path: 'my-players/new', component: MyPlayerFormComponent, canActivate: [authGuard] },
    { path: 'my-players/:id', component: MyPlayerFormComponent, canActivate: [authGuard] }
];

