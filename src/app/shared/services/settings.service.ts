import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { Settings } from 'app/models/settings';

export interface EditSettingsRequest {
    id: number;
    securityPhoneNumber: string;
}

@Injectable()
export class SettingsService extends BaseService<Settings> {
    constructor(httpClient: HttpClientService) {
        super(httpClient, new Settings());
    }

    editSettings(model: EditSettingsRequest) {
        return this.httpClient.put(`${this.baseUrl}/newSideSettings`, model);
    }

    getSettings(): Observable<Settings> {
        return this.httpClient
            .get(`${this.baseUrl}/newSideSettings`)
            .pipe(
                map(r => r.json()),
                map(new Settings().parseJson)
            );
    }
}
