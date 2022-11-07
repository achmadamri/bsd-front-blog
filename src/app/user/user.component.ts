import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetBrandRequest } from 'app/services/product/getbrandrequest';
import { GetBrandResponse } from 'app/services/product/getbrandresponse';
import { ProductService } from 'app/services/product/product.service';
import { GetUserListRequest } from 'app/services/user/getuserlistrequest';
import { GetUserListResponse } from 'app/services/user/getuserlistresponse';
import { UserService } from 'app/services/user/user.service';
import { Util } from 'app/util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  getBrandRequest: GetBrandRequest = new GetBrandRequest();
  getBrandResponse: GetBrandResponse = new GetBrandResponse();
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getUserListRequest: GetUserListRequest = new GetUserListRequest();
  getUserListResponse: GetUserListResponse = new GetUserListResponse();
  tbuEmail = "";
  tbuFirstname = "";
  tbuLastname = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('DMS - User');
      
    this.getUserList(null);
  }

  getUserList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;

    this.userService.getUserList(this.tbuEmail, this.tbuFirstname, this.tbuLastname, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getUserListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getUserListResponse = successResponse;

          this.length = this.getUserListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.clicked = !this.clicked;
          
          this.getUserListResponse = new GetUserListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getUserList(pageEvent);
  }

  UserAdd() {
    this.router.navigate(['/user-add']);
  }

}
