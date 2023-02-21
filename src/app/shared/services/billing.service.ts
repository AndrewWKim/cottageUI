import { Injectable } from '@angular/core'
import { HttpClientService } from 'app/core/http-client.service'
import { Observable } from 'rxjs'
import { BaseService } from 'app/shared/services/base.service'
import { map } from 'rxjs/operators'
import { CommunalBill } from 'app/models/communal-bill'
import { PaymentType } from '../enums/payment-type'
import { PaymentStatus } from '../enums/payment-status'

export interface PagedCommunalBillsResponse {
    total: number
    communalBills: Array<CommunalBill>
}

@Injectable()
export class BillingService extends BaseService<CommunalBill> {

    constructor(httpClient: HttpClientService) {
        super(httpClient, new CommunalBill)
    }

    listAll(offset?: number, limit?: number, cottageId?: number, month?: number, year?: number): Observable<PagedCommunalBillsResponse> {
        return this.httpClient.get(`${this.baseUrl}/billing/communal-bills`, { params: { offset, limit, cottageId, month, year } })
            .pipe(
                map(r => r.json()),
                map(json => <PagedCommunalBillsResponse>{
                    total: Number(json.total || 0),
                    communalBills: (json.communalBills || []).map(new CommunalBill().parseJson)
                })
            )
    }

    updatePaymentStatus(paymentType: PaymentType, paymentId: number, paymentStatus: PaymentStatus): Observable<any> {
        return this.httpClient.put(
            `${this.baseUrl}/billing/cottage/payment-status`,
            null,
            { params: { paymentType, paymentId, paymentStatus } })
    }
}
