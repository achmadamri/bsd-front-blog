import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { UserEditRequest } from 'app/services/user/usereditrequest';
import { UserEditResponse } from 'app/services/user/usereditresponse';
import { UserService } from 'app/services/user/user.service';
import { GetUserMenuListRequest } from 'app/services/user/getusermenulistrequest';
import { GetUserMenuListResponse } from 'app/services/user/getusermenulistresponse';
import { GetBrandRequest } from 'app/services/product/getbrandrequest';
import { GetBrandResponse } from 'app/services/product/getbrandresponse';
import { ProductService } from 'app/services/product/product.service';
import { UserGetRequest } from 'app/services/user/usergetrequest';
import { UserGetResponse } from 'app/services/user/usergetresponse';
import { MarketService } from 'app/services/market/market.service';
import { GetMarketListRequest } from 'app/services/market/getmarketlistrequest';
import { GetMarketListResponse } from 'app/services/market/getmarketlistresponse';
import { ViewUserBrand } from 'app/services/user/viewuserbrand';

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
  getBrandRequest: GetBrandRequest = new GetBrandRequest();
  getBrandResponse: GetBrandResponse = new GetBrandResponse();
  getMarketListRequest: GetMarketListRequest = new GetMarketListRequest();
  getMarketListResponse: GetMarketListResponse = new GetMarketListResponse();
  role: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService,
    private marketService: MarketService,
    private productService: ProductService,
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
  
  checkBrandAllToggle = false;
  checkBrandAll() {
    this.checkBrandAllToggle = !this.checkBrandAllToggle;

    this.userEditRequest.lstViewUserBrand.forEach((element) => {
      element.tbbBrandCheck = this.checkBrandAllToggle == true ? 1 : 0;
    });
  }
  
  checkMarketAllToggle = false;
  checkMarketAll() {
    this.checkMarketAllToggle = !this.checkMarketAllToggle;

    this.userEditRequest.lstTbMarket.forEach((element) => {
      element.check = this.checkMarketAllToggle == true ? 1 : 0;
    });
  }

  roleChange() {
    this.marketService.getMarketListByRole(this.userEditRequest.tbUser.tbuRole, this.getMarketListRequest)
      .subscribe(
        successResponse => {
          this.getMarketListResponse = successResponse;

          this.userEditRequest.lstTbMarket = this.getMarketListResponse.lstTbMarket;

          this.userEditRequest.lstTbMarket.forEach((element) => {
            element.check = 1;
          });

          this.userEditRequest.lstViewUserBrand.forEach((element) => {
            element.tbbBrandCheck = 1;
          });

          if (this.userEditRequest.tbUser.tbuRole == 'ADMIN') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 1;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 1;
            });
          }  

          if (this.userEditRequest.tbUser.tbuRole == 'PRINCIPAL') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 1;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }   

          if (this.userEditRequest.tbUser.tbuRole == 'DISTRIBUTOR') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }

          if (this.userEditRequest.tbUser.tbuRole == 'SUBDIST') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 0;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }

          if (this.userEditRequest.tbUser.tbuRole == 'GROSIR') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 0;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 0;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }
          
          if (this.userEditRequest.tbUser.tbuRole == 'MOTORIST') {
            this.userEditRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 0;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 0;
              if (element.tbmName == 'Product') element.tbumView = 0;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }
        },
        errorResponse => {          
          this.getMarketListResponse = new GetMarketListResponse();
        }
      );
  }

  ngOnInit() {
    this.titleService.setTitle('DMS - User Edit');

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
            this.userEditRequest.lstTbUserMarket = this.userGetResponse.lstTbUserMarket;
            this.userEditRequest.lstViewUserBrand = this.userGetResponse.lstViewUserBrand;

            this.productService.getBrand(this.getBrandRequest)
            .subscribe(
              successResponse => {
                this.getBrandResponse = successResponse;

                this.getBrandResponse.lstTbBrand.forEach((element1) => {
                  let exist = false;
                  
                  this.userEditRequest.lstViewUserBrand.forEach((element2) => {
                    if (element1.tbbBrand == element2.tbbBrand) {
                      exist = true;
                    }
                  });

                  if (exist == false) {
                    let viewUserBrand: ViewUserBrand = new ViewUserBrand();
                    viewUserBrand.tbbBrand = element1.tbbBrand;
                    viewUserBrand.tbbBrandCheck = 0;
                    viewUserBrand.tbbBrandId = element1.tbbBrandId;
                    viewUserBrand.tbuEmail = this.userEditRequest.lstViewUserBrand[0].tbuEmail;
                    viewUserBrand.tbuFirstname = this.userEditRequest.lstViewUserBrand[0].tbuFirstname;
                    viewUserBrand.tbuId = this.userEditRequest.lstViewUserBrand[0].tbuId;
                    viewUserBrand.tbuLastname = this.userEditRequest.lstViewUserBrand[0].tbuLastname;
                    viewUserBrand.uuid = this.userEditRequest.lstViewUserBrand[0].uuid;
                    this.userEditRequest.lstViewUserBrand.push(viewUserBrand);
                  }
                });
              },
              errorResponse => {
                this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
                this.router.navigate(['/user-login']);
              }
            );

            this.marketService.getMarketListByRole(this.userEditRequest.tbUser.tbuRole, this.getMarketListRequest)
            .subscribe(
              successResponse => {
                this.getMarketListResponse = successResponse;
      
                this.userEditRequest.lstTbMarket = this.getMarketListResponse.lstTbMarket;
      
                this.userEditRequest.lstTbMarket.forEach((element1) => {
                  this.userEditRequest.lstTbUserMarket.forEach((element2) => {
                    if (element1.tbmMarket == element2.tbmMarket) {
                      element1.check = element2.tbmMarketCheck;
                    }                                      
                  });  
                });
              },
              errorResponse => {          
                this.getMarketListResponse = new GetMarketListResponse();
              }
            );
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

    this.userEditRequest.lstTbUserMarket.forEach((element) => {
      if (element.tbmMarketCheck) {
        element.tbmMarketCheck = 1;
      } else {
        element.tbmMarketCheck = 0;
      }
    });

    this.userEditRequest.lstTbMarket.forEach((element) => {
      if (element.check) {
        element.check = 1;
      } else {
        element.check = 0;
      }
    });

    this.userEditRequest.lstViewUserBrand.forEach((element) => {
      if (element.tbbBrandCheck) {
        element.tbbBrandCheck = 1;
      } else {
        element.tbbBrandCheck = 0;
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
              this.userEditRequest.lstTbUserMarket = this.userGetResponse.lstTbUserMarket;
              this.userEditRequest.lstViewUserBrand = this.userGetResponse.lstViewUserBrand;
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
