import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResidentType } from 'app/models/residentType';
import { environment } from 'environments/environment';

@Injectable()
export class CommonService {
    baseUrl: string;
    
    constructor(private httpClient: HttpClientService) {
        this.baseUrl = environment.baseUrl + '/api';
    }

    getResidentTypes(): Observable<ResidentType[]> {
        return this.httpClient.get(`${this.baseUrl}/common/resident-types`)
            .pipe(
                map(r => r.json()),
                map(json => json.map(new ResidentType().parseJson)
                )
            );
    }

    getLeftCottagesArea(): Observable<number> {
        return this.httpClient.get(`${this.baseUrl}/common/left-area`)
            .pipe(
                map(r => r.json()),
            );
    }
}