import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface MyPlayer {
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
}
export type MyPlayerDto = Omit<MyPlayer, 'id' | 'created_by'>;

type Paginated<T> = { data: T[]; page: number; pageSize: number; total: number };

@Injectable({ providedIn: 'root' })
export class MyPlayersService {
  constructor(private http: HttpClient) { }

  listMine(): Observable<MyPlayer[]> {
    return this.http.get<Paginated<MyPlayer>>('/api/my-players')
      .pipe(map(r => r?.data ?? []));
  }

  
  create(dto: MyPlayerDto) {
    return this.http.post<MyPlayer>('/api/my-players', dto);
  }
  update(id: number, dto: MyPlayerDto) {
    return this.http.put<MyPlayer>(`/api/my-players/${id}`, dto);
  }
}
