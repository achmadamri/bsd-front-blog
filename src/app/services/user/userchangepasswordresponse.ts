import { TbUser } from './tbuser';

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
