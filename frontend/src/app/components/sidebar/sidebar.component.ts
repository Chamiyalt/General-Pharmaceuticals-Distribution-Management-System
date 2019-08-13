import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Hospitals',  icon:'person', class: '' },
    { path: '/hospital-drug-quentity', title: 'Hospital Drug Quentity',  icon:'library_books', class: '' },

    { path: '/spc', title: 'Spc',  icon:'person', class: '' },

    { path: '/medi', title: 'Add Medicine',  icon:'person', class: '' },
    { path: '/main-drug-add', title: 'Drug Adding',  icon:'library_books', class: '' },
    { path: '/main-drug-table', title: 'Drug Store',  icon:'library_books', class: '' },

    { path: '/hosdist', title: 'Hospital Distribution',  icon:'content_paste', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
