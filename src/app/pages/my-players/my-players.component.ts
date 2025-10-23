import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyPlayersService, MyPlayerPayload } from '../../core/my-players.service';

@Component({
  selector: 'app-my-players',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-players.component.html',
  styleUrls: ['./my-players.component.scss'],
})
export class MyPlayersComponent implements OnInit {
  loading = signal(false);
  error   = signal<string | null>(null);
  items   = signal<MyPlayerPayload[]>([]); // 👈 SIEMPRE array

  constructor(private svc: MyPlayersService) {}

  ngOnInit() {
    this.loading.set(true);
    this.svc.listMine().subscribe({
      next: rows => { this.items.set(rows ?? []); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron cargar tus jugadores'); this.loading.set(false); }
    });
  }
}
