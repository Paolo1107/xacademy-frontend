import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  data: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.check();
  }

  check() {
    this.api.health().subscribe({
      next: (d) => this.data = d,
      error: (e) => this.data = e
    });
  }
}
