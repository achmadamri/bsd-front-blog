import { ViewStock } from './viewstock';

export class GetStockListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewStock: ViewStock[] = Array(new ViewStock());
    length: number;
}
