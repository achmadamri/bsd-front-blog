import { TbEntry } from "./tbEntry";

export class EntryEditRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbEntry: TbEntry = new TbEntry();
}
