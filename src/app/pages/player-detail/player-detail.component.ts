import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService, Player } from '../../core/players.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-player-detail',
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  player?: Player;
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: PlayersService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const gender = this.route.snapshot.queryParamMap.get('gender') || '';
    const version = this.route.snapshot.queryParamMap.get('version') || '';

    this.svc.getById(id, { gender, version }).subscribe(p => {
      this.player = p;
      setTimeout(() => this.drawRadar(), 0);
    });
  }

  drawRadar() {
    if (!this.player) return;
    const ctx = this.radarCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physic'],
        datasets: [{
          label: this.player.long_name,
          data: [
            this.player.pace,
            this.player.shooting,
            this.player.passing,
            this.player.dribbling,
            this.player.defending,
            this.player.physic
          ],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.2)',
          borderWidth: 2,
        }],
      },
      options: {
        scales: { r: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } },
      },
    });
  }

  back() {
    this.router.navigate(['/players']);
  }
}
