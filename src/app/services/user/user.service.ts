import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserAddRequest } from './useraddrequest';
import { UserAddResponse } from './useraddresponse';
import { UserNotifyRequest } from './usernotifyrequest';
import { UserNotifyResponse } from './usernotifyresponse';
import { UserConfirmationRequest } from './userconfirmationrequest';
import { UserConfirmationResponse } from './userconfirmationresponse';
import { UserGetRequest } from './usergetrequest';
import { UserGetResponse } from './usergetresponse';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { GetUserListResponse } from './getuserlistresponse';
import { GetUserListRequest } from './getuserlistrequest';
import { GetUserMenuListRequest } from './getusermenulistrequest';
import { GetUserMenuListResponse } from './getusermenulistresponse';
import { UserEditRequest } from './usereditrequest';
import { UserEditResponse } from './usereditresponse';
import { UserChangePasswordRequest } from './userchangepasswordrequest';
import { UserChangePasswordResponse } from './userchangepasswordresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  util: Util = new Util();
  apiUrl = isDevMode() ? 'http://localhost:2081/user' : 'https://dms.id-trec.com/2081/user';

  constructor(private httpClient: HttpClient) { }

  postUserAdd(userAddRequest: UserAddRequest): Observable<UserAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userAddRequest.email = localStorage.getItem('email');
    userAddRequest.token = localStorage.getItem('token');
    userAddRequest.requestId = this.util.randomString(10);
    userAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserAddResponse>(`${this.apiUrl}/postuseradd`, userAddRequest, { headers });
  }

  postNotify(userNotifyRequest: UserNotifyRequest): Observable<UserNotifyResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userNotifyRequest.requestId = this.util.randomString(10);
    userNotifyRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserNotifyResponse>(`${this.apiUrl}/postnotify`, userNotifyRequest, { headers });
  }

  postConfirmation(userConfirmationRequest: UserConfirmationRequest): Observable<UserConfirmationResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userConfirmationRequest.requestId = this.util.randomString(10);
    userConfirmationRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserConfirmationResponse>(`${this.apiUrl}/postconfirmation`, userConfirmationRequest, { headers });
  }

  getUser(userGetRequest: UserGetRequest): Observable<UserGetResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('tbuId', userGetRequest.tbuId)
      ;

    return this.httpClient.get<UserGetResponse>(`${this.apiUrl}/getuser`, { headers, params });
  }

  postUserEdit(userEditRequest: UserEditRequest): Observable<UserEditResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userEditRequest.email = localStorage.getItem('email');
    userEditRequest.token = localStorage.getItem('token');
    userEditRequest.requestId = this.util.randomString(10);
    userEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserEditResponse>(`${this.apiUrl}/postuseredit`, userEditRequest, { headers });
  }

  postUserChangePassword(userChangePasswordRequest: UserChangePasswordRequest): Observable<UserChangePasswordResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userChangePasswordRequest.email = localStorage.getItem('email');
    userChangePasswordRequest.token = localStorage.getItem('token');
    userChangePasswordRequest.requestId = this.util.randomString(10);
    userChangePasswordRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserEditResponse>(`${this.apiUrl}/postuserchangepassword`, userChangePasswordRequest, { headers });
  }

  getUserList(tbuEmail: string, tbuFirstname: string, tbuLastname: string, length: number, pageSize: number, pageIndex: number, getGwpListRequest: GetUserListRequest): Observable<GetUserListResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('pageSize', pageSize.toString())
      .set('pageIndex', pageIndex.toString())
      .set('tbuEmail', tbuEmail)
      .set('tbuFirstname', tbuFirstname)
      .set('tbuLastname', tbuLastname)
      ;

    return this.httpClient.get<GetUserListResponse>(`${this.apiUrl}/getuserlist`, { headers, params });
  }

  getUserMenuList(tbuEmail: string, getUserMenuListRequest: GetUserMenuListRequest): Observable<GetUserMenuListResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('tbuEmail', tbuEmail)
      ;

    return this.httpClient.get<GetUserMenuListResponse>(`${this.apiUrl}/getusermenulist`, { headers, params });
  }
}
