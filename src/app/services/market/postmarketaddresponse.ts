import { TbMarket } from "./tbmarket";

export class PostMarketAddResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbMarket: TbMarket;
}
