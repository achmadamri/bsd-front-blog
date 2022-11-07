export class PostConfirmRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    orderNo: string[] = Array();
    sku: string[] = Array();
}
