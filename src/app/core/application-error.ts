import { HttpErrorResponse } from '@angular/common/http'

export class ApplicationError {
    response: HttpErrorResponse;
    body: any;
}
