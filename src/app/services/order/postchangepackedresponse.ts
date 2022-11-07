import { TbOrderPackDetail } from "./tborderpackdetail";

export class PostChangePackedResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbOrderPackDetail: TbOrderPackDetail;
}
