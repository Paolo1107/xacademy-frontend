import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { PlayersService, PlayersResponse } from '../../core/players.service';
import { RouterModule } from '@angular/router';

type Filters = {
  name: string;
  club: string;
  position: string;
  gender: string;
  version: string;
  pageSize: number;
};

// Mapa de controles tipados a partir de Filters
type FiltersForm = {
  [K in keyof Filters]: FormControl<Filters[K]>;
};

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  // estado
  loading = signal(false);
  error = signal<string | null>(null);

  // respuesta del backend
  data = signal<PlayersResponse | null>(null);
  players = computed(() => this.data()?.data ?? []);
  page = computed(() => this.data()?.page ?? 1);
  pageSize = computed(() => this.data()?.pageSize ?? 20);
  total = computed(() => this.data()?.total ?? 0);
  totalPages = computed(() => this.data()?.totalPages ?? 1);

  // formulario tipado
  filterForm!: FormGroup<FiltersForm>;

  positions = ['GK', 'LB', 'CB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'];
  genders = ['male', 'female'];
  versions = ['23', '22', '21', '20', '19', '18', '17', '16', '15'];

  constructor(
    private fb: NonNullableFormBuilder,      // builder no-nullable
    private playersSvc: PlayersService
  ) { }

  ngOnInit() {
    // valores iniciales → infiere FormControl<string|number> NO nullables
    this.filterForm = this.fb.group({
      name: '',
      club: '',
      position: '',
      gender: '',
      version: '',
      pageSize: 20,
    });

    this.load(1);
  }

  private currentFilters(): Filters {
    // getRawValue ahora devuelve exactamente Filters
    return this.filterForm.getRawValue();
  }

  load(page = 1) {
    this.loading.set(true);
    this.error.set(null);

    const { name, club, position, gender, version, pageSize } = this.currentFilters();

    this.playersSvc
      .list({
        page,
        pageSize: Number(pageSize) || 20,
        name: name || undefined,
        club: club || undefined,
        position: position || undefined,
        gender: gender || undefined,
        version: version || undefined,
      })
      .subscribe({
        next: (res) => {
          this.data.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Error al cargar jugadores');
          this.loading.set(false);
        },
      });
  }

  submitFilters() {
    this.load(1);
  }

  clearFilters() {
    this.filterForm.setValue({
      name: '',
      club: '',
      position: '',
      gender: '',
      version: '',
      pageSize: 20,
    });
    this.load(1);
  }

  nextPage() {
    const p = this.page();
    if (p < this.totalPages()) this.load(p + 1);
  }

  prevPage() {
    const p = this.page();
    if (p > 1) this.load(p - 1);
  }

  exportCsv() {
    const { name, club, position, gender, version } = this.currentFilters();
    this.playersSvc.exportCsv({
      name: name || undefined,
      club: club || undefined,
      position: position || undefined,
      gender: gender || undefined,
      version: version || undefined,
    });
  }
}
