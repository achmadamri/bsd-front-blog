import { TbUser } from './tbuser';
import { ViewUserMenu } from './viewusermenu';
import { ViewUserBrand } from './viewuserbrand';
import { TbUserMarket } from './tbusermarket';

export class UserGetResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUser: TbUser = new TbUser();
    lstViewUserMenu: ViewUserMenu[] = Array(new ViewUserMenu());
    lstTbUserMarket: TbUserMarket[] = Array(new TbUserMarket());
    lstViewUserBrand: ViewUserBrand[] = Array(new ViewUserBrand());
}
