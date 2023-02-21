import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { News } from 'app/models/news';
import { NewsStatus } from '../enums/news-status';
import { HttpParams } from '@angular/common/http';

export interface CreateNewsRequest {
    additionalInfo: string;
    publicationDate: Date;
    status: NewsStatus;
}

export interface EditNewsRequest {
    id: number;
    additionalInfo: string;
    status: NewsStatus;
}

export interface PagedNewsResponse {
    total: number;
    news: Array<News>;
}

@Injectable()
export class NewsService extends BaseService<News> {
    constructor(httpClient: HttpClientService) {
        super(httpClient, new News());
    }

    listAll(
        offset?: number,
        limit?: number,
        statuses?: any[]
    ): Observable<PagedNewsResponse> {
        return this.httpClient
            .get(`${this.baseUrl}/news`, {
                params: { offset, limit, statuses },
            })
            .pipe(
                map(r => r.json()),
                map(
                    json =>
                        <PagedNewsResponse>{
                            total: Number(json.total || 0),
                            news: (json.news || []).map(new News().parseJson),
                        }
                )
            );
    }

    createNews(model: CreateNewsRequest): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/news`, model);
    }

    editNews(model: EditNewsRequest) {
        return this.httpClient.put(`${this.baseUrl}/news`, model);
    }

    getNewsById(id: string): Observable<News> {
        return this.httpClient.get(`${this.baseUrl}/news/${id}`).pipe(
            map(r => r.json()),
            map(new News().parseJson)
        );
    }
}
