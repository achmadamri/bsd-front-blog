import { TbOrder } from "./tborder";
import { TbOrderPack } from "./tborderpack";
import { TbOrderPackDetail } from "./tborderpackdetail";

export class PostScanBarcodeResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbOrder: TbOrder;
    tbOrderPack: TbOrderPack;
    tbOrderPackDetail: TbOrderPackDetail;
}
