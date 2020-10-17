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
    { path: '/user-profile', title: 'Hospital Register',  icon:'person', class: '' },
    { path: '/spc', title: 'Divisional Stores Register',  icon:'person', class: '' },
    { path: '/medi', title: 'Medicine Register',  icon:'person', class: '' },
    { path: '/hospital-drug-quentity', title: 'Hospital Medicine Quentity',  icon:'library_books', class: '' },




    { path: '/main-drug-add', title: 'Medicine Adding',  icon:'library_books', class: '' },
    { path: '/main-drug-table', title: 'Medicine Store',  icon:'library_books', class: '' },

    { path: '/dashboard-display', title: 'Issue Details',  icon:'library_books', class: '' },

    { path: '/hosdist', title: 'Hospital Distribution',  icon:'content_paste', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  
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
