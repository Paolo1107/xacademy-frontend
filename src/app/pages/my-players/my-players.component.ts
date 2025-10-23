import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyPlayersService, MyPlayer } from '../../core/my-players.service';

@Component({
  selector: 'app-my-players',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-players.component.html',
  styleUrls: ['./my-players.component.scss'],
})
export class MyPlayersComponent implements OnInit {
  loading = signal(false);
  error = signal<string | null>(null);

  // Puede ser array o lo que venga, luego lo normalizamos
  private _raw = signal<unknown>([]);

  //Siempre entregamos un array a la vista
  items = computed<MyPlayer[]>(() => {
    const r = this._raw();
    if (Array.isArray(r)) return r as MyPlayer[];
    if (r && typeof r === 'object') {
      const o = r as any;
      if (Array.isArray(o.items)) return o.items as MyPlayer[];
      if (Array.isArray(o.data)) return o.data as MyPlayer[];
      if (Array.isArray(o.results)) return o.results as MyPlayer[];
    }
    return [];
  });

  constructor(private svc: MyPlayersService) { }

  ngOnInit() {
    this.loading.set(true);
    this.svc.listMine().subscribe({
      next: (res) => {
        
        console.log('GET /api/my-players ->', res);
        this._raw.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar tus jugadores');
        this.loading.set(false);
      }
    });
  }
}
