import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { GetEntryListRequest } from './getentrylistrequest';
import { GetEntryListResponse } from './getentrylistresponse';
import { EntryAddRequest } from './entryaddrequest';
import { EntryAddResponse } from './entryaddresponse';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  util: Util = new Util();
  apiUrl = isDevMode() ? 'http://localhost:2082/entry' : 'https://domain.com/2082/entry';

  constructor(private httpClient: HttpClient) { }

  getEntryList(tbeTitle: string, tbeChunk: string, tbeContent: string, length: number, pageSize: number, pageIndex: number, getEntryListRequest: GetEntryListRequest): Observable<GetEntryListResponse> {
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
      .set('tbeTitle', tbeTitle)
      .set('tbeChunk', tbeChunk)
      .set('tbeContent', tbeContent)
      ;

    return this.httpClient.get<GetEntryListResponse>(`${this.apiUrl}/getentrylist`, { headers, params });
  }
  
  postEntryAdd(entryAddRequest: EntryAddRequest): Observable<EntryAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    entryAddRequest.email = localStorage.getItem('email');
    entryAddRequest.token = localStorage.getItem('token');
    entryAddRequest.requestId = this.util.randomString(10);
    entryAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<EntryAddResponse>(`${this.apiUrl}/postentryadd`, entryAddRequest, { headers });
  }
}
