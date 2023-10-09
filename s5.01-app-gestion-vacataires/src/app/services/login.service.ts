import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl  = 'api/connexion';
  // private apiUrl  = 'https://sae5-01-app-gestion-vacataires-api.vercel.app/connexion';

  constructor(private http: HttpClient) { }

  getPasswordValid(pseudo: string,password: string) {
    return this.http.post(this.apiUrl, {pseudo,password})
    // return this.http.get(this.apiUrl)

  }
  }
