import { TbMarket } from './tbmarket';

export class GetMarketResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbMarket: TbMarket = new TbMarket();
}
