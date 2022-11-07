import { TbMarket } from "./tbmarket";

export class GetMarketListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstTbMarket: TbMarket[] = Array(new TbMarket());
    length: number;
}
