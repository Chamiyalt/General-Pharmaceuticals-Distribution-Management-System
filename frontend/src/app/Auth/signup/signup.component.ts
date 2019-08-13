
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthDataService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit {

  isLoading = false;


  constructor(public authDataSerice: AuthDataService) { }

  ngOnInit() { }

  onsignUp(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authDataSerice.createUser(form.value.email,form.value.password);
    console.log('done');

}

}
