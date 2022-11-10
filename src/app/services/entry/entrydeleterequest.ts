import { TbEntry } from "./tbEntry";

export class EntryDeleteRequest {
    email: string;
    token: string;
    requestId: string;
    requestDate: string;
    tbEntry: TbEntry = new TbEntry();
}
