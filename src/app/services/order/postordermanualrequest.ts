import { TbOrder } from "../order/tborder";

export class PostOrderManualRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
	tbgSku: string;
    details: string;
    tboBrand: string;
    tbOrder: TbOrder[] = Array();
}
