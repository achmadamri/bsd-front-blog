import { TbUser } from "./tbuser";

export class UserChangePasswordRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbUser: TbUser = new TbUser();
}
