import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPlayersService, MyPlayerPayload } from '../../core/my-players.service';
import { Location } from '@angular/common';

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
    // inicializamos el formulario dentro del constructor
    this.form = this.fb.group({
      long_name: ['', [Validators.required, Validators.minLength(3)]],
      player_positions: ['', Validators.required],
      club_name: [''],
      nationality_name: [''],
      overall_rating: [70, [Validators.required, Validators.min(1), Validators.max(99)]],
      pace: [70],
      shooting: [70],
      passing: [70],
      dribbling: [70],
      defending: [70],
      physic: [70],
      gender: ['male', Validators.required],
      fifa_version: ['23', Validators.required],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;
    this.id = idParam ? Number(idParam) : undefined;

  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue() as MyPlayerPayload;

    if (this.isEdit && this.id) {
      this.svc.update(this.id, payload).subscribe(() => this.router.navigate(['/my-players']));
    } else {
      this.svc.create(payload).subscribe(() => this.router.navigate(['/my-players']));
    }
  }
  goBack() { this.location.back(); }
}
