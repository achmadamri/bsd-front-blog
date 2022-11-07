import { TbOrderPackDetail } from "./tborderpackdetail";

export class PostDeletePackedResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbOrderPackDetail: TbOrderPackDetail;
}
