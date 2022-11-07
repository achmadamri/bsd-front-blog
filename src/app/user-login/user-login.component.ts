import { Component, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'app/services/user/user.service';
import { UserGetRequest } from 'app/services/user/usergetrequest';
import { UserGetResponse } from 'app/services/user/usergetresponse';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Util } from '../util';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  test: Date = new Date();
  clicked = false;
  util: Util = new Util();
  latitude: number;
  longitude: number;
  authGenerateRequest: AuthGenerateRequest = new AuthGenerateRequest();
  authGenerateResponse: AuthGenerateResponse = new AuthGenerateResponse();
  userGetRequest: UserGetRequest = new UserGetRequest();
  userGetResponse: UserGetResponse = new UserGetResponse();

  constructor(    
    private titleService: Title,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('DMS - Login');
    this.setCurrentLocation();
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.util.setLonglat(this.longitude, this.latitude);
      });
    }
  }

  login() {
    this.clicked = !this.clicked;

    this.authGenerateRequest.tbaIdLogin = this.authGenerateRequest.tbaEmail;

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.authGenerateResponse = successResponse;

          this.util.setSession(this.authGenerateResponse);

          this.userGetRequest.tbuId = '';

          this.userService.getUser(this.userGetRequest)
            .subscribe(
              successResponse => {
                this.userGetResponse = successResponse;

                this.util.setSessionUser(this.userGetResponse);

                window.location.href = '/';
              },
              errorResponse => {
                this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
              }
            );
        },
        errorResponse => {
          this.clicked = !this.clicked;

          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
        }
      );
  }

}
