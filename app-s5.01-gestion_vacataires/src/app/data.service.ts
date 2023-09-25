import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacataire } from './models/vacataire';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl  = 'https://sae5-01-gestion-vacataires-api.vercel.app';

  constructor(private http: HttpClient) {}

  getVacataires() {
    return this.http.get(this.apiUrl + "/vacataires")
  }

  getCours() {
    return this.http.get(this.apiUrl + "/cours")
  }

  createVacataire(vacataire: Vacataire) {
    return this.http.post(`${this.apiUrl}/vacataires`, vacataire);
  }

}
