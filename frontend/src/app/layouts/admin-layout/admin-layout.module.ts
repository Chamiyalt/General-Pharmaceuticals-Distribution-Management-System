import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserProfile1Component } from '../../user-profile1/user-profile1.component';
import { SpcComponent } from '../../spc/spc.component';
import { SpclistComponent } from '../../spclist/spclist.component';
import { MediComponent } from '../../medi/medi.component';
import { MedilistComponent } from '../../medilist/medilist.component';
import { HospitalDistComponent } from '../../hospital-dist/hospital-dist.component';
import { DrugDealerComponent } from '../../drug-dealer/drug-dealer.component';
import { DrugDealerlistComponent } from '../../drug-dealerlist/drug-dealerlist.component';
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
  MatProgressSpinnerModule
} from '@angular/material';

import { LoginComponent } from 'app/Auth/login/login.component';
import { SignUpComponent } from 'app/Auth/signup/signup.component';
import { UserRole } from 'app/Auth/user-roles/userrole.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
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
    MatProgressSpinnerModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserProfile1Component,
    SpcComponent,
    SpclistComponent,
    MediComponent,
    MedilistComponent,
    HospitalDistComponent,
    DrugDealerComponent,
    DrugDealerlistComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UserRole,


  ]
})

export class AdminLayoutModule {}
