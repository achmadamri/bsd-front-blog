import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { UserService } from 'app/services/user/user.service';
import { UserGetRequest } from 'app/services/user/usergetrequest';
import { UserGetResponse } from 'app/services/user/usergetresponse';
import { UserChangePasswordRequest } from 'app/services/user/userchangepasswordrequest';
import { UserChangePasswordResponse } from 'app/services/user/userchangepasswordresponse';
import { TbUser } from 'app/services/user/tbuser';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  tbUser: TbUser = new TbUser();
  userGetRequest: UserGetRequest = new UserGetRequest();
  userGetResponse: UserGetResponse = new UserGetResponse();
  userChangePasswordRequest: UserChangePasswordRequest = new UserChangePasswordRequest();
  userChangePasswordResponse: UserChangePasswordResponse = new UserChangePasswordResponse();
  role: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Administrator - User Profile');

    this.tbUser = JSON.parse(localStorage.getItem('user'));
    
    this.userGetRequest.tbuId = this.tbUser.tbuId.toString();

    this.userService.getUser(this.userGetRequest)
    .subscribe(
      successResponse => {
        this.userGetResponse = successResponse;

        this.userChangePasswordRequest.tbUser = this.userGetResponse.tbUser;
      },
      errorResponse => {
        this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
        this.router.navigate(['/user-login']);
      }
    );
  }

  save() {
    this.clicked = !this.clicked;

    if (this.userChangePasswordRequest.tbUser.tbuPassword == this.userChangePasswordRequest.tbUser.tbuPasswordConfirm) {
      this.userService.postUserChangePassword(this.userChangePasswordRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.userChangePasswordResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.userChangePasswordResponse.message);

          this.userService.getUser(this.userGetRequest)
          .subscribe(
            successResponse => {
              this.userGetResponse = successResponse;

              this.userChangePasswordRequest.tbUser = this.userGetResponse.tbUser;
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
}
