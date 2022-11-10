import { TbComment } from './tbcomment';
import { TbEntry } from './tbentry';

export class EntryCommentResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    tbEntry: TbEntry = new TbEntry();
    tbComment: TbComment = new TbComment();
}
