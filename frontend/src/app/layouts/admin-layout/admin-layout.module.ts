import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { MainDrugAddComponent } from '../../main-drug-add/main-drug-add.component';
import { MainDrugTableComponent } from '../../main-drug-table/main-drug-table.component';

import { SpcComponent } from '../../spc/spc.component';

import { MediComponent } from '../../medi/medi.component';

import { HospitalDistComponent } from '../../hospital-dist/hospital-dist.component';

import { HospitalDrugQuentityComponent } from '../../hospital-drug-quentity/hospital-drug-quentity.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,

} from '@angular/material';

import { LoginComponent } from 'app/Auth/login/login.component';
import { SignUpComponent } from 'app/Auth/signup/signup.component';






@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MainDrugTableComponent,
    MainDrugAddComponent,
    SpcComponent,

    MediComponent,

    HospitalDistComponent,
    HospitalDrugQuentityComponent,


    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,


  ]
})

export class AdminLayoutModule {}
