import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
     // Ici contient les composants qui profitent de FormsModule
  ],
  imports: [
    FormsModule,
    // d'autres imports ici
  ]
})
export class MonModule { }import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoginFormModule { }
