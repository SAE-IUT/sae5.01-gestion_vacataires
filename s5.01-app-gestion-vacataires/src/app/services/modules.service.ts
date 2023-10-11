import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private apiUrl  = 'api/modules';

  constructor(private http: HttpClient) { }

  getModule() {
    return this.http.get(this.apiUrl)
  }

  addModule(name: string, name_reduit: string, color_hexa: string, departement: string[], matiere: string ): Observable<any> {

    const url = this.apiUrl + "/newModule";
    return this.http.post(url, {name, name_reduit, color_hexa, departement, matiere});
  }

  deleteModule(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteModule/' + id;
    return this.http.delete(url);
  }


  updateModule(id: string, name: string, name_reduit: string, color_hexa: string, departement: string[], matiere: string ): Observable<any> {
    const url = this.apiUrl + '/editModule/'+ id;
    return this.http.put<any>(url,{name, name_reduit, color_hexa, departement, matiere});
  }
}
