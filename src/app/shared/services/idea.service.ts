import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { Idea } from 'app/models/idea';
import { IdeaStatus } from '../enums/idea-status';
import { HttpParams } from '@angular/common/http';

export interface CreateIdeaRequest {
    additionalInfo: string;
    publicationDate: Date;
    userId: number;
    status: IdeaStatus;
}

export interface EditIdeaRequest {
    id: number;
    additionalInfo: string;
    status: IdeaStatus;
}

@Injectable()
export class IdeaService extends BaseService<Idea>  {

    constructor(httpClient: HttpClientService) {
        super(httpClient, new Idea());
    }

    listAll(offset?: number, limit?: number, statuses?: any[]): Observable<Idea[]> {
        return this.httpClient.get(`${this.baseUrl}/ideas`, { params: { offset, limit, statuses } })
            .pipe(
                map(r => r.json()),
                map(json => (json.ideas || []).map(new Idea().parseJson)
                )
            );
    }

    createIdea(model: CreateIdeaRequest): Observable<any> {
        return this.httpClient.post(
            `${this.baseUrl}/ideas`, model);
    }

    editIdea(model: EditIdeaRequest) {
        return this.httpClient.put(
            `${this.baseUrl}/ideas/edit`, model);
    }

    getIdeaById(id: string): Observable<Idea> {
        return this.httpClient.get(`${this.baseUrl}/ideas/idea/${id}`).pipe(
            map(r => r.json()),
            map((new Idea().parseJson)
            ))
    }
}