import { TbOrder } from './tborder';

export class GetScanBarcodeCheckResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    orderStatus: string;
    qtyTbo: number;
    qtyTbopd: number;
}
