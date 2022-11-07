import { TbUser } from './tbuser';
import { ViewUserBrand } from './viewuserbrand';
import { ViewUserMenu } from './viewusermenu';

export class UserEditResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUser: TbUser = new TbUser();
    lstViewUserMenu: ViewUserMenu[] = Array(new ViewUserMenu());
    lstViewUserBrand: ViewUserBrand[] = Array(new ViewUserBrand());
}
