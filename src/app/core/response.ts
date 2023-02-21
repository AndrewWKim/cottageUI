import { HttpResponse } from '@angular/common/http';

export class Response {
    httpResponse: HttpResponse<any>;
    constructor(response: HttpResponse<any>) {
        this.httpResponse = response;
    }
    json() {
        return this.httpResponse.body;
    }
}
