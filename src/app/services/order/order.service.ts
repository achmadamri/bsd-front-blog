import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { PostUploadOrderRequest } from './postuploadorderrequest';
import { PostUploadOrderResponse } from './postuploadorderresponse';
import { GetOrderListRequest } from './getorderlistrequest';
import { GetOrderListResponse } from './getorderlistresponse';
import { PostOrderAddRequest } from './postorderaddrequest';
import { PostOrderAddResponse } from './postorderaddresponse';
import { PostOrderEditRequest } from './postordereditrequest';
import { PostOrderEditResponse } from './postordereditresponse';
import { GetOrderRequest } from './getorderrequest';
import { GetOrderResponse } from './getorderresponse';
import { PostOrderDeleteRequest } from './postorderdeleterequest';
import { PostOrderDeleteResponse } from './postorderdeleteresponse';
import { GetOrderPackRequest } from './getorderpackrequest';
import { GetOrderPackResponse } from './getorderpackresponse';
import { PostScanBarcodeRequest } from './postscanbarcoderequest';
import { PostScanBarcodeResponse } from './postscanbarcoderesponse';
import { GetScanBarcodeCheckRequest } from './getscanbarcodecheckrequest';
import { GetScanBarcodeCheckResponse } from './getscanbarcodecheckresponse';
import { PostOrderManualRequest } from './postordermanualrequest';
import { PostOrderManualResponse } from './postordermanualresponse';
import { GetOrderConfirmListRequest } from './getorderconfirmlistrequest';
import { GetOrderConfirmListResponse } from './getorderconfirmlistresponse';
import { PostChangePackedRequest } from './postchangepackedrequest';
import { PostChangePackedResponse } from './postchangepackedresponse';
import { PostDeletePackedRequest } from './postdeletepackedrequest';
import { PostDeletePackedResponse } from './postdeletepackedresponse';
import { PostConfirmRequest } from './postconfirmrequest';
import { PostConfirmResponse } from './postconfirmresponse';
import { PostConfirmOrderRequest } from './postconfirmorderrequest';
import { PostConfirmOrderResponse } from './postconfirmorderresponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  util: Util = new Util();
  apiUrl = isDevMode() ? 'http://localhost:2083/order' : 'https://dms.id-trec.com/2083/order';

  constructor(private httpClient: HttpClient) { }  

  postOrderManual(postOrderManualRequest: PostOrderManualRequest): Observable<PostOrderManualResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderManualRequest.email = localStorage.getItem('email');
    postOrderManualRequest.token = localStorage.getItem('token');
    postOrderManualRequest.requestId = this.util.randomString(10);
    postOrderManualRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderManualResponse>(`${this.apiUrl}/postordermanual`, postOrderManualRequest, { headers });
  }

  postUploadOrder(PostUploadOrderRequest: PostUploadOrderRequest, selectedFile: File): Observable<PostUploadOrderResponse> {
    const headers = new HttpHeaders()
      .set('asd', 'asd');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'));

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    return this.httpClient.post<PostUploadOrderResponse>(`${this.apiUrl}/postuploadorder`, formData, { headers, params });
  }

  getOrderConfirmList(orderNo: string, sku: string, status: string, type: string, brand: string, start: string, end: string, length: number, pageSize: number, pageIndex: number, getOrderConfirmListRequest: GetOrderConfirmListRequest): Observable<GetOrderConfirmListResponse> {
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
      .set('orderNo', orderNo)
      .set('sku', sku)
      .set('status', status)
      .set('brand', brand)
      .set('type', type)
      .set('start', start)
      .set('end', end)
      ;

    return this.httpClient.get<GetOrderConfirmListResponse>(`${this.apiUrl}/getorderconfirmlist`, { headers, params });
  }

  getOrderList(orderNo: string, start: string, end: string, status: string, length: number, pageSize: number, pageIndex: number, getOrderListRequest: GetOrderListRequest): Observable<GetOrderListResponse> {
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
      .set('orderNo', orderNo)
      .set('start', start)
      .set('end', end)
      .set('status', status)
      ;

    return this.httpClient.get<GetOrderListResponse>(`${this.apiUrl}/getorderlist`, { headers, params });
  }

  postOrderAdd(postOrderAddRequest: PostOrderAddRequest): Observable<PostOrderAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderAddRequest.email = localStorage.getItem('email');
    postOrderAddRequest.token = localStorage.getItem('token');
    postOrderAddRequest.requestId = this.util.randomString(10);
    postOrderAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderAddResponse>(`${this.apiUrl}/postorderadd`, postOrderAddRequest, { headers });
  }

  postOrderEdit(postOrderEditRequest: PostOrderEditRequest): Observable<PostOrderEditResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderEditRequest.email = localStorage.getItem('email');
    postOrderEditRequest.token = localStorage.getItem('token');
    postOrderEditRequest.requestId = this.util.randomString(10);
    postOrderEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderEditResponse>(`${this.apiUrl}/postorderedit`, postOrderEditRequest, { headers });
  }

  postOrderDelete(postOrderDeleteRequest: PostOrderDeleteRequest): Observable<PostOrderDeleteResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderDeleteRequest.email = localStorage.getItem('email');
    postOrderDeleteRequest.token = localStorage.getItem('token');
    postOrderDeleteRequest.requestId = this.util.randomString(10);
    postOrderDeleteRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderDeleteResponse>(`${this.apiUrl}/postorderdelete`, postOrderDeleteRequest, { headers });
  }

  getOrder(tboId: string, getOrderRequest: GetOrderRequest): Observable<GetOrderResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tboId', tboId)
      ;

    return this.httpClient.get<GetOrderResponse>(`${this.apiUrl}/getorder`, { headers, params });
  }

  getOrderPack(tboOrderNo: string, tbopAwb: string, tbopQcId: string, getOrderPackRequest: GetOrderPackRequest): Observable<GetOrderPackResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tbopAwb', tbopAwb)
      .set('tbopQcId', tbopQcId == null ? "" : tbopQcId.toString())
      .set('tboOrderNo', tboOrderNo)
      ;

    return this.httpClient.get<GetOrderPackResponse>(`${this.apiUrl}/getorderpack`, { headers, params });
  }

  getScanBarcodeCheck(tboOrderNo: string, tbpSku: string, getScanBarcodeCheckRequest: GetScanBarcodeCheckRequest): Observable<GetScanBarcodeCheckResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tboOrderNo', tboOrderNo)
      .set('tbpSku', tbpSku)
      ;

    return this.httpClient.get<GetScanBarcodeCheckResponse>(`${this.apiUrl}/getscanbarcodecheck`, { headers, params });
  }

  postScanBarcode(postScanBarcodeRequest: PostScanBarcodeRequest): Observable<PostScanBarcodeResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postScanBarcodeRequest.email = localStorage.getItem('email');
    postScanBarcodeRequest.token = localStorage.getItem('token');
    postScanBarcodeRequest.requestId = this.util.randomString(10);
    postScanBarcodeRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostScanBarcodeResponse>(`${this.apiUrl}/postscanbarcode`, postScanBarcodeRequest, { headers });
  }

  postChangePacked(postChangePackedRequest: PostChangePackedRequest): Observable<PostChangePackedResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postChangePackedRequest.email = localStorage.getItem('email');
    postChangePackedRequest.token = localStorage.getItem('token');
    postChangePackedRequest.requestId = this.util.randomString(10);
    postChangePackedRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostScanBarcodeResponse>(`${this.apiUrl}/postchangepacked`, postChangePackedRequest, { headers });
  }

  postDeletePacked(postDeletePackedRequest: PostDeletePackedRequest): Observable<PostDeletePackedResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postDeletePackedRequest.email = localStorage.getItem('email');
    postDeletePackedRequest.token = localStorage.getItem('token');
    postDeletePackedRequest.requestId = this.util.randomString(10);
    postDeletePackedRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostScanBarcodeResponse>(`${this.apiUrl}/postdeletepacked`, postDeletePackedRequest, { headers });
  }

  postConfirm(postConfirmRequest: PostConfirmRequest): Observable<PostConfirmResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postConfirmRequest.email = localStorage.getItem('email');
    postConfirmRequest.token = localStorage.getItem('token');
    postConfirmRequest.requestId = this.util.randomString(10);
    postConfirmRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostScanBarcodeResponse>(`${this.apiUrl}/postconfirm`, postConfirmRequest, { headers });
  }

  postConfirmOrder(postConfirmOrderRequest: PostConfirmOrderRequest): Observable<PostConfirmOrderResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postConfirmOrderRequest.email = localStorage.getItem('email');
    postConfirmOrderRequest.token = localStorage.getItem('token');
    postConfirmOrderRequest.requestId = this.util.randomString(10);
    postConfirmOrderRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostScanBarcodeResponse>(`${this.apiUrl}/postconfirmorder`, postConfirmOrderRequest, { headers });
  }
}
