import { TbUser } from './tbuser';
import { ViewUserBrand } from './viewuserbrand';
import { ViewUserMenu } from './viewusermenu';

export class UserChangePasswordResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbUser: TbUser = new TbUser();
}
