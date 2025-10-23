import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPlayersService } from '../../core/my-players.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-players',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-players.component.html',
  styleUrls: ['./my-players.component.scss']
})
export class MyPlayersComponent implements OnInit {
  loading = true; error: string | null = null; data: any[] = [];
  constructor(private svc: MyPlayersService, private router: Router) { }
  ngOnInit() {
    this.svc.listMine().subscribe({
      next: d => { this.data = d; this.loading = false; },
      error: () => { this.error = 'No se pudieron cargar tus jugadores'; this.loading = false; }
    });
  }
}
