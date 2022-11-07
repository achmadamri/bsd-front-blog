import { TbMarket } from "../market/tbmarket";
import { TbUser } from "./tbuser";
import { TbUserMarket } from "./tbusermarket";
import { ViewUserBrand } from "./viewuserbrand";
import { ViewUserMenu } from "./viewusermenu";

export class UserChangePasswordRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbUser: TbUser = new TbUser();
}
