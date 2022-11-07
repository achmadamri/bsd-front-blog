import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { UserAddRequest } from 'app/services/user/useraddrequest';
import { UserAddResponse } from 'app/services/user/useraddresponse';
import { UserService } from 'app/services/user/user.service';
import { GetUserMenuListRequest } from 'app/services/user/getusermenulistrequest';
import { GetUserMenuListResponse } from 'app/services/user/getusermenulistresponse';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  userAddRequest: UserAddRequest = new UserAddRequest();
  userAddResponse: UserAddResponse = new UserAddResponse();
  getUserMenuListRequest: GetUserMenuListRequest = new GetUserMenuListRequest();
  getUserMenuListResponse: GetUserMenuListResponse = new GetUserMenuListResponse();
  role: string[];

  constructor(
    private router: Router,
    private titleService: Title,
    private userService: UserService,
  ) { }

  checkAddAllToggle = false;
  checkAddAll() {
    this.checkAddAllToggle = !this.checkAddAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumAdd = this.checkAddAllToggle == true ? 1 : 0;
    });
  }

  checkEditAllToggle = false;
  checkEditAll() {
    this.checkEditAllToggle = !this.checkEditAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumEdit = this.checkEditAllToggle == true ? 1 : 0;
    });
  }

  checkDeleteAllToggle = false;
  checkDeleteAll() {
    this.checkDeleteAllToggle = !this.checkDeleteAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumDelete = this.checkDeleteAllToggle == true ? 1 : 0;
    });
  }

  checkViewAllToggle = false;
  checkViewAll() {
    this.checkViewAllToggle = !this.checkViewAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumView = this.checkViewAllToggle == true ? 1 : 0;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Administrator - User Add');

    this.role = ['ADMIN', 'PRINCIPAL', 'DISTRIBUTOR', 'SUBDIST', 'GROSIR', 'MOTORIST'];

    this.userService.getUserMenuList('', this.getUserMenuListRequest)
      .subscribe(
        successResponse => {
          this.getUserMenuListResponse = successResponse;
          this.userAddRequest.lstViewUserMenu = this.getUserMenuListResponse.lstViewUserMenu;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );
  }

  save() {
    this.clicked = !this.clicked;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      if (element.tbumView) {
        element.tbumView = 1;
      } else {
        element.tbumView = 0;
      }

      if (element.tbumAdd) {
        element.tbumAdd = 1;
      } else {
        element.tbumAdd = 0;
      }

      if (element.tbumEdit) {
        element.tbumEdit = 1;
      } else {
        element.tbumEdit = 0;
      }
      
      if (element.tbumDelete) {
        element.tbumDelete = 1;
      } else {
        element.tbumDelete = 0;
      }
    });

    if (this.userAddRequest.tbUser.tbuPassword == this.userAddRequest.tbUser.tbuPasswordConfirm) {
      this.userService.postUserAdd(this.userAddRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.userAddResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.userAddResponse.message);

          this.userAddRequest = new UserAddRequest();

          this.userAddRequest.lstViewUserMenu = this.getUserMenuListResponse.lstViewUserMenu;

          this.checkAddAllToggle = false;
          this.checkEditAllToggle = false;
          this.checkDeleteAllToggle = false;
          this.checkViewAllToggle = false;
          this.userAddRequest.lstViewUserMenu.forEach((element) => {
            element.tbumAdd = 0;
            element.tbumEdit = 0;
            element.tbumDelete = 0;
            element.tbumView = 0;
          });
        },
        errorResponse => {
          this.clicked = !this.clicked;

          if (errorResponse.error.status === 400) {
            let message = "";

            for (let i = 0; i < errorResponse.error.errors.length; i++) {
              message = message + errorResponse.error.errors[i].defaultMessage + "<br>";
            }           

            this.util.showNotification('danger', 'top', 'center', message);
          } else if (errorResponse.error.status === 403) {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);

            this.router.navigate(['/user-login']);
          } else {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.message);
          }
        }
      );
    } else {
      this.clicked = !this.clicked;
      
      this.util.showNotification('danger', 'top', 'center', 'Password is not match');
    }    
  }

  back() {
    this.router.navigate(['/user']);
  }
}
