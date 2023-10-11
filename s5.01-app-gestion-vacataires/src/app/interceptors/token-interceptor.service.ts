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
      const token = localStorage.getItem("token")
      if (token) {
        req = req.clone({
          setHeaders:{
            Authorization :`Bearer ${token}`,
          }
        })
      }
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.status === 401){
            this.router.navigate(
              ["/connexion"],
              {
                replaceUrl:true
              }
            )
          }else {
            console.log("redirection ok")
          }
          return throwError(err);
        })
      )
  }
}
