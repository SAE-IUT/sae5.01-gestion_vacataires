import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl  = 'http://localhost:3000/connexion/getUser';

  constructor(private http: HttpClient) { }

  getPasswordValid(pseudo: string,password: string) {
    return this.http.post(this.apiUrl, {pseudo,password})
    // return this.http.post(this.apiUrl+ `?pseudo=${pseudo}&password=${password}`)

  }
  }
