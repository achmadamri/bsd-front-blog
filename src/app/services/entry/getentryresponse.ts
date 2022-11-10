import { TbComment } from './tbcomment';
import { TbEntry } from './tbentry';

export class GetEntryResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbEntry: TbEntry = new TbEntry();
    lstTbComment: TbComment[] = Array(new TbComment());
}
