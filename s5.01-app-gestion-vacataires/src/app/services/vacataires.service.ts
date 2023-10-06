import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VacatairesService {

  //private apiUrl  = 'https://sae5-01-app-gestion-vacataires-api.vercel.app/vacataires';
  private apiUrl  = '/api/vacataires';

  constructor(private http: HttpClient) { }

  getVacataire() {
    return this.http.get(this.apiUrl)    
  }

  addVacataire(name: string, lastName: string, email: string): Observable<any> {
    const url = this.apiUrl + "/newVacataire";
    return this.http.post(url, {name, lastName, email});   
  }

  deleteVacataire(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteVacataire/' + id;
    return this.http.delete(url);   
  }
}
