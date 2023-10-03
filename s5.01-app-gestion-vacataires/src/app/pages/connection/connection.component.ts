import { Component } from '@angular/core';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent {

  loginForm: NgForm | undefined;

  onSubmit(form: NgForm | undefined) {
    console.log(form?.value);
    // Do login here
  }

  form = {
    pseudo : "",
    password: "",
  }
  connect(pseudo: String, password: String) {

  }
}
