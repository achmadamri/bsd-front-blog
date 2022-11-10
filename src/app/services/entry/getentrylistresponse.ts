import { ViewUserEntry } from './viewuserentry';

export class GetEntryListResponse {
    requestId: string;
    requestDate: string;
    responseId: string;
    responseDate: string;
    status: string;
    error: string;
    message: string;
    lstViewUserEntry: ViewUserEntry[] = Array(new ViewUserEntry());
    length: number;
}
