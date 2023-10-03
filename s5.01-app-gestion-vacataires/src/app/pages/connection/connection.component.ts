import { Component } from '@angular/core';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onSubmit(loginForm)">
      <input type="text" name="username" ngModel required>
      <input type="password" name="password" ngModel required>
      <button type="submit" [disabled]="!loginForm.valid">Login</button>
    </form>
  `
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
    // Do login here
  }
}
