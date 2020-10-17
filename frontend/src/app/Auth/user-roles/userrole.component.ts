
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
  isRemeber: boolean;
  role = 'admin';


  roles: UserRoleSave[] = [
    { value: 'admin', viewValue: 'Operator' },
    { value: 'division', viewValue: 'Divisional Officer' },
    { value: 'hospital', viewValue: 'Dispencer' },
    { value: 'ministry', viewValue: 'Minisrty Officer' }
  ];


  constructor(public authDataSerice: AuthDataService) { }

  ngOnInit() {
    this.isRemeber = false;
  }

  onsignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.rememberInput) {
      this.authDataSerice.createUser(form.value.email, form.value.password, this.role);
      this.isRemeber = form.value.rememberInput
    }
    console.log('done');

  }

}
