import { TbUser } from './tbuser';

export class GetUserListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstTbUser: TbUser[] = Array(new TbUser());
    length: number;
}
