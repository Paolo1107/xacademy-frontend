import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type MyPlayerPayload = {
    long_name: string;
    player_positions: string;
    club_name?: string;
    nationality_name?: string;
    overall_rating: number;
    pace: number; shooting: number; passing: number; dribbling: number; defending: number; physic: number;
    gender: 'male' | 'female';
    fifa_version: string;
};

@Injectable({ providedIn: 'root' })
export class MyPlayersService {
    constructor(private http: HttpClient) { }

    listMine() { return this.http.get<any[]>('/api/my-players'); }
    create(payload: MyPlayerPayload) { return this.http.post<any>('/api/my-players', payload); }
    update(id: number, payload: Partial<MyPlayerPayload>) { return this.http.put<any>(`/api/my-players/${id}`, payload); }
}
