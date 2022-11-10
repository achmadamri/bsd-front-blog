import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { GetEntryListRequest } from './getentrylistrequest';
import { GetEntryListResponse } from './getentrylistresponse';
import { EntryAddRequest } from './entryaddrequest';
import { EntryAddResponse } from './entryaddresponse';
import { GetEntryRequest } from './getentryrequest';
import { GetEntryResponse } from './getentryresponse';
import { EntryEditRequest } from './entryeditrequest';
import { EntryEditResponse } from './entryeditresponse';
import { EntryDeleteRequest } from './entrydeleterequest';
import { EntryDeleteResponse } from './entrydeleteresponse';

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

  getEntry(getEntryRequest: GetEntryRequest): Observable<GetEntryResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('tbeId', getEntryRequest.tbeId)
      ;

    return this.httpClient.get<GetEntryResponse>(`${this.apiUrl}/getentry`, { headers, params });
  }

  postEntryEdit(entryEditRequest: EntryEditRequest): Observable<EntryAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    entryEditRequest.email = localStorage.getItem('email');
    entryEditRequest.token = localStorage.getItem('token');
    entryEditRequest.requestId = this.util.randomString(10);
    entryEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<EntryEditResponse>(`${this.apiUrl}/postentryedit`, entryEditRequest, { headers });
  }

  postEntryDelete(entryDeleteRequest: EntryDeleteRequest): Observable<EntryDeleteResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    entryDeleteRequest.email = localStorage.getItem('email');
    entryDeleteRequest.token = localStorage.getItem('token');
    entryDeleteRequest.requestId = this.util.randomString(10);
    entryDeleteRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<EntryEditResponse>(`${this.apiUrl}/postentrydelete`, entryDeleteRequest, { headers });
  }
}
