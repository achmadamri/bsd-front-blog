import { TbUser } from "./tbuser";
import { ViewUserMenu } from "./viewusermenu";

export class UserEditRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbUser: TbUser = new TbUser();
    lstViewUserMenu: ViewUserMenu[] = Array(new ViewUserMenu());
}
