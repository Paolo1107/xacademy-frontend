import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService, Player } from '../../core/players.service';
import {
  Chart, RadarController, RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend
} from 'chart.js';
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;

  loading = true;
  error: string | null = null;
  player!: Player;
  chart?: Chart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playersSvc: PlayersService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const gender = this.route.snapshot.queryParamMap.get('gender') ?? undefined;
    const version = this.route.snapshot.queryParamMap.get('version') ?? undefined;

    if (!Number.isFinite(id)) { this.error = 'ID inválido'; this.loading = false; return; }

    this.playersSvc.getById(id, { gender, version }).subscribe({
      next: (p) => { this.player = p; this.loading = false; queueMicrotask(() => this.renderChart()); },
      error: () => { this.error = 'No se pudo cargar el jugador'; this.loading = false; }
    });
  }

  renderChart() {
    if (!this.radarCanvas) return;
    const { pace, shooting, passing, dribbling, defending, physic } = this.player;
    this.chart?.destroy();
    this.chart = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: ['PACE', 'SHOOT', 'PASS', 'DRIB', 'DEF', 'PHY'],
        datasets: [{ label: this.player.long_name, data: [pace, shooting, passing, dribbling, defending, physic], fill: true }]
      },
      options: { responsive: true, scales: { r: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 20 } } } }
    });
  }

  back() { this.router.navigate(['/players']); }
  ngOnDestroy() { this.chart?.destroy(); }
}
