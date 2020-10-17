
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthDataService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoading = false;


  constructor(public authDataService: AuthDataService) { }

  ngOnInit() { }

onLogin(form: NgForm){
  if(form.invalid){
    return;
  }
  if(form.value.rememberMe){
    this.authDataService.onlogin(form.value.email,form.value.password);
  }
}

rememberMe(){

}

}
