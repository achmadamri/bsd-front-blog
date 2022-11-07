import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { UserEditRequest } from 'app/services/user/usereditrequest';
import { UserEditResponse } from 'app/services/user/usereditresponse';
import { UserService } from 'app/services/user/user.service';
import { GetUserMenuListRequest } from 'app/services/user/getusermenulistrequest';
import { GetUserMenuListResponse } from 'app/services/user/getusermenulistresponse';
import { UserGetRequest } from 'app/services/user/usergetrequest';
import { UserGetResponse } from 'app/services/user/usergetresponse';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  userGetRequest: UserGetRequest = new UserGetRequest();
  userGetResponse: UserGetResponse = new UserGetResponse();
  userEditRequest: UserEditRequest = new UserEditRequest();
  userEditResponse: UserEditResponse = new UserEditResponse();
  getUserMenuListRequest: GetUserMenuListRequest = new GetUserMenuListRequest();
  getUserMenuListResponse: GetUserMenuListResponse = new GetUserMenuListResponse();
  role: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService,
  ) { }

  checkAddAllToggle = false;
  checkAddAll() {
    this.checkAddAllToggle = !this.checkAddAllToggle;

    this.userEditRequest.lstViewUserMenu.forEach((element) => {
      element.tbumAdd = this.checkAddAllToggle == true ? 1 : 0;
    });
  }

  checkEditAllToggle = false;
  checkEditAll() {
    this.checkEditAllToggle = !this.checkEditAllToggle;

    this.userEditRequest.lstViewUserMenu.forEach((element) => {
      element.tbumEdit = this.checkEditAllToggle == true ? 1 : 0;
    });
  }

  checkDeleteAllToggle = false;
  checkDeleteAll() {
    this.checkDeleteAllToggle = !this.checkDeleteAllToggle;

    this.userEditRequest.lstViewUserMenu.forEach((element) => {
      element.tbumDelete = this.checkDeleteAllToggle == true ? 1 : 0;
    });
  }

  checkViewAllToggle = false;
  checkViewAll() {
    this.checkViewAllToggle = !this.checkViewAllToggle;

    this.userEditRequest.lstViewUserMenu.forEach((element) => {
      element.tbumView = this.checkViewAllToggle == true ? 1 : 0;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Administrator - User Edit');

    this.role = ['ADMIN', 'PRINCIPAL', 'DISTRIBUTOR', 'SUBDIST', 'GROSIR', 'MOTORIST'];

    this.route.paramMap.subscribe(params => {
      this.userGetRequest.tbuId = params.get('tbuId') == null ? '0' : params.get('tbuId');

      this.userService.getUser(this.userGetRequest)
        .subscribe(
          successResponse => {
            this.userGetResponse = successResponse;

            this.userEditRequest.tbUser = this.userGetResponse.tbUser;
            this.userEditRequest.tbUser.tbuPassword = '';
            this.userEditRequest.tbUser.tbuPasswordConfirm = '';
            this.userEditRequest.lstViewUserMenu = this.userGetResponse.lstViewUserMenu;
            
          },
          errorResponse => {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
            this.router.navigate(['/user-login']);
          }
        );
    });
  }

  save() {
    this.clicked = !this.clicked;

    this.userEditRequest.lstViewUserMenu.forEach((element) => {
      if (element.tbumView) {
        element.tbumView = 1;
      } else {
        element.tbumView = 0;
      }

      if (element.tbumEdit) {
        element.tbumEdit = 1;
      } else {
        element.tbumEdit = 0;
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
      
      if (element.tbumAdd) {
        element.tbumAdd = 1;
      } else {
        element.tbumAdd = 0;
      }
    });

    if (this.userEditRequest.tbUser.tbuPassword == this.userEditRequest.tbUser.tbuPasswordConfirm) {
      this.userService.postUserEdit(this.userEditRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.userEditResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.userEditResponse.message);

          this.userService.getUser(this.userGetRequest)
          .subscribe(
            successResponse => {
              this.userGetResponse = successResponse;

              this.userEditRequest.tbUser = this.userGetResponse.tbUser;
              this.userEditRequest.tbUser.tbuPassword = '';
              this.userEditRequest.tbUser.tbuPasswordConfirm = '';              
              this.userEditRequest.lstViewUserMenu = this.userGetResponse.lstViewUserMenu;
            },
            errorResponse => {
              this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
              this.router.navigate(['/user-login']);
            }
          );
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
