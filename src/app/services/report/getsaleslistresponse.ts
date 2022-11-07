import { ViewSales } from './viewsales';

export class GetSalesListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewSales: ViewSales[] = Array(new ViewSales());
    length: number;
}
