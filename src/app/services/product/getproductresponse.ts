import { TbProduct } from './tbproduct';
import { TbProductBundle } from './tbproductbundle';

export class GetProductResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbProduct: TbProduct = new TbProduct();
    lstTbProductBundle: TbProductBundle[] = Array(new TbProductBundle());
}
