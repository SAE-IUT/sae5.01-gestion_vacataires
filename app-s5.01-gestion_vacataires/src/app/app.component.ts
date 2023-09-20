import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-s5.01-gestion_vacataires';
  isNavbarActive = false; // Variable pour suivre l'état de la classe

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNavbarActive = false;
      }
    });
  }

  toggleNavbarActive() {
    this.isNavbarActive = !this.isNavbarActive; // Basculer l'état
  }

  isNotFoundRoute() {
    return this.router.url === '/404';
  }
  
}
