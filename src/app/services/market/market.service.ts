import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { GetMarketListRequest } from './getmarketlistrequest';
import { GetMarketListResponse } from './getmarketlistresponse';
import { PostMarketAddRequest } from './postmarketaddrequest';
import { PostMarketAddResponse } from './postmarketaddresponse';
import { PostMarketEditRequest } from './postmarketeditrequest';
import { PostMarketEditResponse } from './postmarketeditresponse';
import { GetMarketRequest } from './getmarketrequest';
import { GetMarketResponse } from './getmarketresponse';
import { PostMarketDeleteRequest } from './postmarketdeleterequest';
import { PostMarketDeleteResponse } from './postmarketdeleteresponse';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  util: Util = new Util();
  apiUrl = isDevMode() ? 'http://localhost:2084/market' : 'https://dms.id-trec.com/2084/market';

  constructor(private httpClient: HttpClient) { }

  getMarketListByRole(tbmRole: string, getMarketListRequest: GetMarketListRequest): Observable<GetMarketListResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tbmRole', tbmRole)
      ;

    return this.httpClient.get<GetMarketListResponse>(`${this.apiUrl}/getmarketlistbyrole`, { headers, params });
  }

  getMarketList(tbmMarket: string, length: number, pageSize: number, pageIndex: number, getMarketListRequest: GetMarketListRequest): Observable<GetMarketListResponse> {
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
      .set('tbmMarket', tbmMarket)
      ;

    return this.httpClient.get<GetMarketListResponse>(`${this.apiUrl}/getmarketlist`, { headers, params });
  }

  postMarketAdd(postMarketAddRequest: PostMarketAddRequest): Observable<PostMarketAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postMarketAddRequest.email = localStorage.getItem('email');
    postMarketAddRequest.token = localStorage.getItem('token');
    postMarketAddRequest.requestId = this.util.randomString(10);
    postMarketAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostMarketAddResponse>(`${this.apiUrl}/postmarketadd`, postMarketAddRequest, { headers });
  }

  postMarketEdit(postMarketEditRequest: PostMarketEditRequest): Observable<PostMarketEditResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postMarketEditRequest.email = localStorage.getItem('email');
    postMarketEditRequest.token = localStorage.getItem('token');
    postMarketEditRequest.requestId = this.util.randomString(10);
    postMarketEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostMarketEditResponse>(`${this.apiUrl}/postmarketedit`, postMarketEditRequest, { headers });
  }

  postMarketDelete(postMarketDeleteRequest: PostMarketDeleteRequest): Observable<PostMarketDeleteResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postMarketDeleteRequest.email = localStorage.getItem('email');
    postMarketDeleteRequest.token = localStorage.getItem('token');
    postMarketDeleteRequest.requestId = this.util.randomString(10);
    postMarketDeleteRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostMarketDeleteResponse>(`${this.apiUrl}/postmarketdelete`, postMarketDeleteRequest, { headers });
  }

  getMarket(tbmId: string, getMarketRequest: GetMarketRequest): Observable<GetMarketResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tbmId', tbmId)
      ;

    return this.httpClient.get<GetMarketResponse>(`${this.apiUrl}/getmarket`, { headers, params });
  }
}
