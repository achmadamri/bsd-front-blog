import { TbEntry } from "./tbEntry";

export class EntryAddRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbEntry: TbEntry = new TbEntry();
}
