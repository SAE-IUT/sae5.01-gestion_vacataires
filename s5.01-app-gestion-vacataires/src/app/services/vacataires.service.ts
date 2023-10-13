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

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string, skills: string[]): Observable<any> {
    const url = this.apiUrl + "/newVacataire";
    return this.http.post(url, {name, lastName, phone, email, github, skills});
  }

  deleteVacataire(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteVacataire/' + id;
    return this.http.delete(url);
  }

  editVacataire(id: String, name: string, lastName: string, phone: string, email: string, github: string, skills: string[]): Observable<any> {
    const url = this.apiUrl + '/editVacataire/' + id;
    const body = {
      name: name,
      lastName: lastName,
      phone: phone,
      email: email,
      github: github,
      skills : skills
    }
    return this.http.put(url, body);   
  }

  affecterVacataire(id: string, nomCours: string): Observable<any> {
    const url = this.apiUrl + '/affecterVacataire/' + id
    return this.http.patch(url, { nomCours });
  }

  desaffecterVacataire(id: string, nomCours: string): Observable<any> {
    const url = `${this.apiUrl}/desaffecterVacataire/${id}`;
    return this.http.patch(url, { nomCours });
  }
}
