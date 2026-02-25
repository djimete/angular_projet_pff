import { Injectable } from '@angular/core';
import { InscriptionRequest, LoginRequest, LoginResponse, User } from '../models';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = "http://localhost:8084/api";

  constructor(private httpClient: HttpClient) { }

  register(request: any): Observable<void> {
    return this.httpClient.post<void>(`${this.API_URL}/inscription`, request);
  }

  verifieEmailExiste(email: string): Observable<void> {
    return this.httpClient.get<void>(`${this.API_URL}/auth/verifieEmail/${email}`);
  }

  authentification(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.API_URL}/auth/login`, request).pipe(
      tap(res => this.saveToken(res))
    );
  }

  saveToken(req: LoginResponse): void {
    localStorage.setItem("USER_TOKEN", req.token);
    localStorage.setItem("USER_INFOS", JSON.stringify(req.user));
  }

  getToken() { return localStorage.getItem("USER_TOKEN"); }

  getUser(): User | null {
    const user = localStorage.getItem("USER_INFOS");
    return user ? JSON.parse(user) : null;
  }

  isPrestataire(): boolean {
    const user = this.getUser();
    return !!(user && user.tarif && Number(user.tarif) > 0);
  }

  // CORRECTION ICI : Remplacement de logout() par deconnection()
  // pour correspondre à l'appel dans HomeComponent
  deconnection(): void {
    localStorage.clear();
  }
}
