import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPlayersService, MyPlayerDto, MyPlayer } from '../../core/my-players.service';

@Component({
  selector: 'app-my-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-player-form.component.html',
  styleUrls: ['./my-player-form.component.scss']
})
export class MyPlayerFormComponent implements OnInit {
  isEdit = false;
  id?: number;
  form: FormGroup;

  positions = ['GK', 'LB', 'CB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'];
  genders = ['male', 'female'];
  versions = ['23', '22', '21', '20', '19', '18', '17', '16', '15'];

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: MyPlayersService,
    private location: Location
  ) {
    this.form = this.fb.group({
      long_name: ['', [Validators.required, Validators.minLength(3)]],
      player_positions: ['ST', Validators.required],
      club_name: [''],
      nationality_name: [''],
      overall_rating: [70, [Validators.required, Validators.min(1), Validators.max(99)]],
      pace: [70], shooting: [70], passing: [70],
      dribbling: [70], defending: [70], physic: [70],
      gender: ['male', Validators.required],
      fifa_version: ['23', Validators.required],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;
    this.id = idParam ? Number(idParam) : undefined;

    //si venimos desde la lista con state, precargamos sin pegarle al backend
    const state = this.location.getState() as Partial<MyPlayer> | undefined;
    if (this.isEdit && this.id && state && state.id) {
      const primaryPos = (state.player_positions ?? '').split(',')[0].trim();
      this.form.patchValue({
        long_name: state.long_name ?? '',
        player_positions: primaryPos || 'ST',
        club_name: state.club_name ?? '',
        nationality_name: state.nationality_name ?? '',
        overall_rating: state.overall_rating ?? 70,
        pace: state.pace ?? 70,
        shooting: state.shooting ?? 70,
        passing: state.passing ?? 70,
        dribbling: state.dribbling ?? 70,
        defending: state.defending ?? 70,
        physic: state.physic ?? 70,
        gender: (state.gender as 'male' | 'female') ?? 'male',
        fifa_version: String(state.fifa_version ?? '23'),
      });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const f = this.form.getRawValue();
    const dto: MyPlayerDto = {
      long_name: f.long_name.trim(),
      player_positions: f.player_positions,
      club_name: f.club_name?.trim() || null,
      nationality_name: f.nationality_name?.trim() || null,
      overall_rating: Number(f.overall_rating),
      pace: Number(f.pace),
      shooting: Number(f.shooting),
      passing: Number(f.passing),
      dribbling: Number(f.dribbling),
      defending: Number(f.defending),
      physic: Number(f.physic),
      gender: f.gender as 'male' | 'female',
      fifa_version: String(f.fifa_version),
    };

    const req$ = (this.isEdit && this.id)
      ? this.svc.update(this.id, dto)
      : this.svc.create(dto);

    req$.subscribe({
      next: () => this.router.navigate(['/my-players']),
      error: (err) => console.error('SAVE ERROR', err)
    });
  }

  goBack() { this.location.back(); }
}
