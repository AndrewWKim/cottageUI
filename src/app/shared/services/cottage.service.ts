import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';
import { Cottage } from 'app/models/cottage';
import { map } from 'rxjs/operators';

export interface PagedCottagesResponse {
    total: number;
    cottages: Array<Cottage>;
}

export interface CreateCottageRequest {
    cottageNumber: string;
    area: number;
}

export interface EditCottageRequest extends CreateCottageRequest {
    id: number;
}

@Injectable()
export class CottageService extends BaseService<Cottage>  {

    constructor(httpClient: HttpClientService) {
        super(httpClient, new Cottage());
    }

    listAll(offset?: number, limit?: number, withoutOwners? : boolean): Observable<PagedCottagesResponse> {
        return this.httpClient.get(`${this.baseUrl}/cottages`, { params: { offset, limit, withoutOwners } })
            .pipe(
                map(r => r.json()),
                map(json => <PagedCottagesResponse>{
                    total: Number(json.total || 0),
                    cottages: (json.cottages || []).map(new Cottage().parseJson)
                })
            );
    }

    getCottageById(id: string): Observable<Cottage> {
        return this.httpClient.get(`${this.baseUrl}/cottages/${id}`).pipe(
            map(r => r.json()),
            map((new Cottage().parseJson)
            ));
    }

    createCottage(model: CreateCottageRequest): Observable<any> {
        return this.httpClient.post(
            `${this.baseUrl}/cottages`, model);
    }

    updateCottage(model: EditCottageRequest): Observable<any> {
        return this.httpClient.put(
            `${this.baseUrl}/cottages`, model);
    }

    deleteCottage(id: number): Observable<any> {
        return this.httpClient.delete(
            `${this.baseUrl}/cottages`, id);
    }
}
