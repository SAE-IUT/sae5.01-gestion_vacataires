import { NonNullAssert } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  form: any = {
    email: null,
    password: null
  }

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmit() {
    const email = this.form.email;
    const password = this.form.password;
    console.log(this.form.email + "\n" + this.form.password);
  
  }
}
