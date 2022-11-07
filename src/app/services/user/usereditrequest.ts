import { TbMarket } from "../market/tbmarket";
import { TbUser } from "./tbuser";
import { TbUserMarket } from "./tbusermarket";
import { ViewUserBrand } from "./viewuserbrand";
import { ViewUserMenu } from "./viewusermenu";

export class UserEditRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbUser: TbUser = new TbUser();
    lstViewUserMenu: ViewUserMenu[] = Array(new ViewUserMenu());
    lstTbUserMarket: TbUserMarket[] = Array(new TbUserMarket());
    lstViewUserBrand: ViewUserBrand[] = Array(new ViewUserBrand());
    lstTbMarket: TbMarket[] = Array(new TbMarket());
}
