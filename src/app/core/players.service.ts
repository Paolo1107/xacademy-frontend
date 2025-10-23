import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id: number;
  long_name: string;
  player_positions: string;
  club_name: string | null;
  nationality_name: string | null;
  overall_rating: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physic: number;
  gender: 'male' | 'female';
  fifa_version: string;
}
export interface PlayersResponse {
  data: Player[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  list(params: {
    page?: number;
    pageSize?: number;
    name?: string;
    club?: string;
    position?: string;
    gender?: string;
    version?: string;
  }): Observable<PlayersResponse> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        httpParams = httpParams.set(k, String(v));
      }
    });
    return this.http.get<PlayersResponse>('/api/players', { params: httpParams });
  }

  exportCsv(params: {
    name?: string; club?: string; position?: string; gender?: string; version?: string;
  }) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        httpParams = httpParams.set(k, String(v));
      }
    });

    this.http.get('/api/players/export', {
      params: httpParams,
      responseType: 'blob',       // 👈 recibimos Blob
      observe: 'response'         // 👈 para leer headers (filename)
    }).subscribe((res: HttpResponse<Blob>) => {
      const blob = res.body!;
      // Intentar obtener el nombre de archivo desde Content-Disposition
      const cd = res.headers.get('Content-Disposition') || '';
      let filename = 'players_export.csv';
      const m = /filename="?([^"]+)"?/.exec(cd);
      if (m?.[1]) filename = m[1];

      // Crear un link temporal y disparar descarga
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  getById(id: number, opts?: { gender?: string; version?: string }) {
    let params = new HttpParams();
    if (opts?.gender) params = params.set('gender', opts.gender);
    if (opts?.version) params = params.set('version', opts.version);
    return this.http.get<Player>(`/api/players/${id}`, { params });
  }


}
