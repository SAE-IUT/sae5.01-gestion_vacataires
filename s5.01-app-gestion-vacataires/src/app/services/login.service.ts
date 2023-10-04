import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl  = 'http://localhost:3000/connexion';

  constructor(private http: HttpClient) { }

  getPasswordValid(pseudo: string,password: string) {
    return this.http.get(this.apiUrl, {pseudo,password})
  }
  }
