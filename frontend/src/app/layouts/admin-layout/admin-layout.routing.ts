import { Routes } from '@angular/router';

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
import { UserRole } from 'app/Auth/user-roles/userrole.component';


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
    { path: 'user-profile1',  component: UserProfile1Component },
    { path: 'spc',   component: SpcComponent },
    { path: 'spclist',   component: SpclistComponent },
    { path: 'medi',   component: MediComponent },
    { path: 'medilist',   component: MedilistComponent },
    { path: 'dealer',   component: DrugDealerComponent },
    { path: 'dealerlist',   component: DrugDealerlistComponent},
    { path: 'hosdist' , component: HospitalDistComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'edithos/:hospitalId', component: UserProfileComponent },
    { path: 'editspc/:spcId',   component: SpcComponent },
    { path: 'userrole',   component: UserRole },

];
