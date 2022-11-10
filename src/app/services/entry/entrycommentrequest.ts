import { TbComment } from "./tbcomment";
import { TbEntry } from "./tbEntry";

export class EntryCommentRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbEntry: TbEntry = new TbEntry();
    tbComment: TbComment = new TbComment();
}
