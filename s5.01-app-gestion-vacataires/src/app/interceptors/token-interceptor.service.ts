import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (this.router.url !== "/connexion"){
        // on enregistre la route actuelle
        localStorage.setItem("currentRoute",this.router.url)
      }
      const token = localStorage.getItem("token")

      if (token) {
        //Ajout du token dans le header de la requête
        req = req.clone({
          setHeaders:{
            Authorization :`Bearer ${token}`,
          }
        })
      }
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.status === 401){
            //Si token expiré ou invalide on renvoie vers connexion
            this.router.navigate(
              ["/connexion"],
              {
                replaceUrl:true
              }
            )
          }
          return throwError(err);
        })
      )
  }
}
