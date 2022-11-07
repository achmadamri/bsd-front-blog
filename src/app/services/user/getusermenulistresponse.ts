import { ViewUserMenu } from './viewusermenu';

export class GetUserMenuListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewUserMenu: ViewUserMenu[] = Array(new ViewUserMenu());
    length: number;
}
