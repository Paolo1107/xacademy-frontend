import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type MyPlayerPayload = {

    id: number;
  long_name: string;
  player_positions: string;
  club_name: string | null;
  nationality_name: string | null;
  overall_rating: number;
  pace: number; shooting: number; passing: number;
  dribbling: number; defending: number; physic: number;
  gender: 'male' | 'female';
  fifa_version: string;
  created_by: number;
};

@Injectable({ providedIn: 'root' })
export class MyPlayersService {
    constructor(private http: HttpClient) { }

    listMine(): Observable<MyPlayerPayload[]> {
    return this.http.get<MyPlayerPayload[]>('/api/my-players');
  }

  create(payload: Partial<MyPlayerPayload>): Observable<MyPlayerPayload> {
    return this.http.post<MyPlayerPayload>('/api/my-players', payload);
  }

  update(id: number, payload: Partial<MyPlayerPayload>): Observable<MyPlayerPayload> {
    return this.http.put<MyPlayerPayload>(`/api/my-players/${id}`, payload);
  }
}
