import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { FormsModule } from "@angular/forms";
// import { HttpClientModule } from "@angular/common/http";

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { HospitalCreateComponent } from './Hospitals/hospital-create/hospital-create.component';
// import { HospitalListComponent } from './Hospitals/hospital-list/hospital-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // FormsModule,
    // HttpClientModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    // HospitalCreateComponent,
    // HospitalListComponent,
    // HttpClientModule,
    // FormsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,


  ]
})
export class ComponentsModule { }
