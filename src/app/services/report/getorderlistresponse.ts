import { ViewOrder } from './vieworder';

export class GetOrderListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewOrder: ViewOrder[] = Array(new ViewOrder());
    length: number;
}
