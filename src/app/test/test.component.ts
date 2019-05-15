import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-test]',
  template:`<h2>Welcome {{name}}
  </h2>
  <h2 class="text-success">Code evelution</h2>
  <h2 [class]="success">Code evelution</h2>
  <h2 [style.color]="'orange'">Code evelution</h2>
  <h2 [style.color]="hasEror?'red':'orange'">Code evelution</h2>
  <h2 [class.text-danger]="hasError">Code evelution</h2>
  <h2 [ngClass]="messegeClass">Code evelution</h2>
  <h2 [ngStyle]="titleStyle">Code evelution23</h2>
  <input #myInput type="text">
  <input type="text" value="Wishwas">
  <button (click)="logMessage()">log</button>
  <button (click)="onClick()">Greet</button>
  {{Greeting}}
  <input [(ngModel)]="name1" type="text">
  {{name1}}
  `,
  
  styles: [`
  .text-success{
    color:green;
  }
  .text-danger{
    color:red;
  } 
  .text-special{
    font-style: italic;
  }`] 
})
export class TestComponent implements OnInit {

  onClick(){
    console.log('welcome to code Evelution');
    this.Greeting='Welcome to code Evelution';
  }
  public Greeting="";
  public name ="cODE eVELUATION";
  public name1="";
  public siteUrl=window.location.href;
  public success ="text-success";
  hasError=false;
  public isSpecial=true;
  public messegeClass={
    "text-success":!this.hasError,
    "text-danger":this.hasError,
    "text-special":this.isSpecial

  }
  public titleStyle={
    color:"red",
    fontStyle:"italic"

  }
  constructor() { }

  ngOnInit() {
  }
  greetUser(){
    return "Hello World"+this.name;
  }

}
