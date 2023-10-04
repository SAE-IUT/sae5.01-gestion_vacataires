import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl  = 'https://localhost:3000/connexion';

  constructor(private http: HttpClient) { }

  getPasswordValide(pseudo:string,password:string) {
    return this.http.get(this.apiUrl, {pseudo,password})
  }
  }
