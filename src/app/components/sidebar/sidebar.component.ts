import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TbUser } from 'app/services/user/tbuser';
import { ViewUserMenu } from 'app/services/user/viewusermenu';
import { Util } from 'app/util';
import * as moment from 'moment';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/user', title: 'User',  icon:'account_box', class: '' },
    { path: '/entry', title: 'Entry',  icon:'account_box', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu = false;
  util: Util = new Util();
  menuItems: any[];
  tbUser: TbUser = new TbUser();

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    let lstViewUserMenu: ViewUserMenu[] = JSON.parse(localStorage.getItem('menu'));

    this.menuItems.forEach((eMenuItem) => {
      lstViewUserMenu.forEach((eMenu) => {
        if (eMenu.tbmName == eMenuItem.title && eMenu.tbumView == 0) {
          this.menuItems = this.menuItems.filter(obj => obj !== eMenuItem);
        }        
      });
    });
    
    this.tbUser = JSON.parse(localStorage.getItem('user'));

    if (this.isLoggedIn()) this.menu = true;
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.util.logout();

    window.location.href = '/';
  }

  userProfile() {
    this.router.navigate(['/user-profile']);
  }

  isLoggedIn() {
    const day = moment.unix(Number(localStorage.getItem('exp')));
    return moment().isBefore(day);
  }
}
