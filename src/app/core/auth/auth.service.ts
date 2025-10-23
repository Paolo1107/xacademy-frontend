import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

interface LoginResponse {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient) { }

    // Llamada al backend (POST /auth/login)
    login(email: string, password: string) {
        return this.http.post<LoginResponse>('/auth/login', { email, password }).pipe(
            tap((res) => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
                this.isLoggedIn$.next(true);
            })
        );
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isLoggedIn$.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    isAuthenticated$() {
        return this.isLoggedIn$.asObservable();
    }

    isAuthenticated() { return !!this.getToken(); }

}