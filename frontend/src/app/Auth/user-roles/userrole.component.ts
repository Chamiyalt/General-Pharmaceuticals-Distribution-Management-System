
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthDataService } from '../auth.service';
import { UserRoleSave } from '../userrole.model';


@Component({
  selector: 'app-userrole',
  templateUrl: 'userrole.component.html',
  styleUrls: ['./userrole.component.css']
})

export class UserRole implements OnInit {

  isLoading = false;
  role = 'admin' ;


  roles: UserRoleSave[] = [
    {value: 'admin', viewValue: 'Operator'},
    {value: 'division', viewValue: 'Divisional Officer'},
    {value: 'hospital', viewValue: 'Dispencer'},
    {value: 'ministry', viewValue: 'Minisrty Officer'}
  ];


  constructor(public authDataSerice: AuthDataService) { }

  ngOnInit() { }

  onsignUp(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authDataSerice.createUser(form.value.email,form.value.password,this.role);
    console.log('done');

}

}
