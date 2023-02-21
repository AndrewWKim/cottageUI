import { Injectable } from '@angular/core'
import { HttpClientService } from 'app/core/http-client.service'
import { Observable } from 'rxjs'
import { BaseService } from 'app/shared/services/base.service'
import { map } from 'rxjs/operators'
import { PassRequest } from 'app/models/pass-request'

export interface PagedPassRequestsResponse {
    total: number
    passRequests: Array<PassRequest>
}

@Injectable()
export class PassRequestService extends BaseService<PassRequest> {
    constructor(httpClient: HttpClientService) {
        super(httpClient, new PassRequest())
    }

    listAll(
        date: string,
        cottageId: number,
        offset?: number,
        limit?: number
    ): Observable<PagedPassRequestsResponse> {
        return this.httpClient
            .get(`${this.baseUrl}/passRequests`, {
                params: { offset, limit, date, cottageId },
            })
            .pipe(
                map((r) => r.json()),
                map(
                    (json) =>
                        <PagedPassRequestsResponse>{
                            total: Number(json.total || 0),
                            passRequests: (json.passRequests || []).map(
                                new PassRequest().parseJson
                            ),
                        }
                )
            )
    }

    delete(passRequestId: number): Observable<any> {
        return this.httpClient.delete(
            `${this.baseUrl}/passRequests/${passRequestId}`
        )
    }
}
