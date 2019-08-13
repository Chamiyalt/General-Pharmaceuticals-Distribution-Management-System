import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { SpcComponent } from '../../spc/spc.component';

import { MediComponent } from '../../medi/medi.component';

import { HospitalDistComponent } from '../../hospital-dist/hospital-dist.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MainDrugTableComponent } from 'app/main-drug-table/main-drug-table.component';
import { MainDrugAddComponent } from 'app/main-drug-add/main-drug-add.component';
import { HospitalDrugQuentityComponent } from 'app/hospital-drug-quentity/hospital-drug-quentity.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'main-drug-table',   component: MainDrugTableComponent },
    { path: 'main-drug-add',   component: MainDrugAddComponent },
    { path: 'hospital-drug-quentity',   component: HospitalDrugQuentityComponent },

    { path: 'spc',   component: SpcComponent },

    { path: 'medi',   component: MediComponent },


    { path: 'hosdist' , component: HospitalDistComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'edithos/:hospitalId', component: UserProfileComponent },
    { path: 'editspc/:spcId',   component: SpcComponent },

];
