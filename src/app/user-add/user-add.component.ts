import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';
import { UserAddRequest } from 'app/services/user/useraddrequest';
import { UserAddResponse } from 'app/services/user/useraddresponse';
import { UserService } from 'app/services/user/user.service';
import { GetUserMenuListRequest } from 'app/services/user/getusermenulistrequest';
import { GetUserMenuListResponse } from 'app/services/user/getusermenulistresponse';
import { GetBrandRequest } from 'app/services/product/getbrandrequest';
import { GetBrandResponse } from 'app/services/product/getbrandresponse';
import { ProductService } from 'app/services/product/product.service';
import { MarketService } from 'app/services/market/market.service';
import { GetMarketListRequest } from 'app/services/market/getmarketlistrequest';
import { GetMarketListResponse } from 'app/services/market/getmarketlistresponse';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  userAddRequest: UserAddRequest = new UserAddRequest();
  userAddResponse: UserAddResponse = new UserAddResponse();
  getUserMenuListRequest: GetUserMenuListRequest = new GetUserMenuListRequest();
  getUserMenuListResponse: GetUserMenuListResponse = new GetUserMenuListResponse();
  getBrandRequest: GetBrandRequest = new GetBrandRequest();
  getBrandResponse: GetBrandResponse = new GetBrandResponse();
  getMarketListRequest: GetMarketListRequest = new GetMarketListRequest();
  getMarketListResponse: GetMarketListResponse = new GetMarketListResponse();
  role: string[];

  constructor(
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private productService: ProductService,
    private marketService: MarketService
  ) { }

  checkAddAllToggle = false;
  checkAddAll() {
    this.checkAddAllToggle = !this.checkAddAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumAdd = this.checkAddAllToggle == true ? 1 : 0;
    });
  }

  checkEditAllToggle = false;
  checkEditAll() {
    this.checkEditAllToggle = !this.checkEditAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumEdit = this.checkEditAllToggle == true ? 1 : 0;
    });
  }

  checkDeleteAllToggle = false;
  checkDeleteAll() {
    this.checkDeleteAllToggle = !this.checkDeleteAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumDelete = this.checkDeleteAllToggle == true ? 1 : 0;
    });
  }

  checkViewAllToggle = false;
  checkViewAll() {
    this.checkViewAllToggle = !this.checkViewAllToggle;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      element.tbumView = this.checkViewAllToggle == true ? 1 : 0;
    });
  }
  
  checkBrandAllToggle = false;
  checkBrandAll() {
    this.checkBrandAllToggle = !this.checkBrandAllToggle;

    this.userAddRequest.lstTbBrand.forEach((element) => {
      element.check = this.checkBrandAllToggle == true ? 1 : 0;
    });
  }
  
  checkMarketAllToggle = false;
  checkMarketAll() {
    this.checkMarketAllToggle = !this.checkMarketAllToggle;

    this.userAddRequest.lstTbMarket.forEach((element) => {
      element.check = this.checkMarketAllToggle == true ? 1 : 0;
    });
  }

  roleChange() {
    this.marketService.getMarketListByRole(this.userAddRequest.tbUser.tbuRole, this.getMarketListRequest)
      .subscribe(
        successResponse => {
          this.getMarketListResponse = successResponse;

          this.userAddRequest.lstTbMarket = this.getMarketListResponse.lstTbMarket;

          this.userAddRequest.lstTbMarket.forEach((element) => {
            element.check = 1;
          });

          this.userAddRequest.lstTbBrand.forEach((element) => {
            element.check = 1;
          });

          if (this.userAddRequest.tbUser.tbuRole == 'ADMIN') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 1;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 1;
            });
          }  

          if (this.userAddRequest.tbUser.tbuRole == 'PRINCIPAL') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 1;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }   

          if (this.userAddRequest.tbUser.tbuRole == 'DISTRIBUTOR') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 1;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }

          if (this.userAddRequest.tbUser.tbuRole == 'SUBDIST') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 1;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 0;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }

          if (this.userAddRequest.tbUser.tbuRole == 'GROSIR') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
              if (element.tbmName == 'Confirm') element.tbumView = 1;
              if (element.tbmName == 'Market') element.tbumView = 0;
              if (element.tbmName == 'Order') element.tbumView = 0;
              if (element.tbmName == 'Packing') element.tbumView = 1;
              if (element.tbmName == 'Product') element.tbumView = 0;
              if (element.tbmName == 'Report') element.tbumView = 1;
              if (element.tbmName == 'User') element.tbumView = 0;
            });
          }
          
          if (this.userAddRequest.tbUser.tbuRole == 'MOTORIST') {
            this.userAddRequest.lstViewUserMenu.forEach((element) => {
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
    this.titleService.setTitle('DMS - User Add');

    this.role = ['ADMIN', 'PRINCIPAL', 'DISTRIBUTOR', 'SUBDIST', 'GROSIR', 'MOTORIST'];

    this.userService.getUserMenuList('', this.getUserMenuListRequest)
      .subscribe(
        successResponse => {
          this.getUserMenuListResponse = successResponse;
          this.userAddRequest.lstViewUserMenu = this.getUserMenuListResponse.lstViewUserMenu;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );

    this.productService.getBrand(this.getBrandRequest)
      .subscribe(
        successResponse => {
          this.getBrandResponse = successResponse;
          this.userAddRequest.lstTbBrand = this.getBrandResponse.lstTbBrand;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );
  }

  save() {
    this.clicked = !this.clicked;

    this.userAddRequest.lstViewUserMenu.forEach((element) => {
      if (element.tbumView) {
        element.tbumView = 1;
      } else {
        element.tbumView = 0;
      }

      if (element.tbumAdd) {
        element.tbumAdd = 1;
      } else {
        element.tbumAdd = 0;
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
    });

    this.userAddRequest.lstTbMarket.forEach((element) => {
      if (element.check) {
        element.check = 1;
      } else {
        element.check = 0;
      }
    });

    this.userAddRequest.lstTbBrand.forEach((element) => {
      if (element.check) {
        element.check = 1;
      } else {
        element.check = 0;
      }
    });

    if (this.userAddRequest.tbUser.tbuPassword == this.userAddRequest.tbUser.tbuPasswordConfirm) {
      this.userService.postUserAdd(this.userAddRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.userAddResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.userAddResponse.message);

          this.userAddRequest = new UserAddRequest();

          this.userAddRequest.lstViewUserMenu = this.getUserMenuListResponse.lstViewUserMenu;

          this.userAddRequest.lstTbMarket = this.getMarketListResponse.lstTbMarket;

          this.userAddRequest.lstTbBrand = this.getBrandResponse.lstTbBrand;

          this.checkAddAllToggle = false;
          this.checkEditAllToggle = false;
          this.checkDeleteAllToggle = false;
          this.checkViewAllToggle = false;
          this.userAddRequest.lstViewUserMenu.forEach((element) => {
            element.tbumAdd = 0;
            element.tbumEdit = 0;
            element.tbumDelete = 0;
            element.tbumView = 0;
          });

          this.checkBrandAllToggle = false;
          this.userAddRequest.lstTbBrand.forEach((element) => {
            element.check = 0;
          });
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
