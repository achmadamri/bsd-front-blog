import { TbOrderPack } from "./tborderpack";

export class PostPackingRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbOrderPack: TbOrderPack;
}
