import { HttpClientService } from 'app/core/http-client.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonParser } from 'app/models/model-json-parser';

// User this workflow https://stackoverflow.com/questions/40171533/typescript-call-static-method-of-generic-type
export abstract class BaseService<T> {
    protected classToCreate: JsonParser<T>;
    protected baseUrl: string;

    constructor(protected httpClient: HttpClientService, classToCreate: JsonParser<T>) {
        this.classToCreate = classToCreate;
        this.baseUrl = environment.baseUrl + '/api';
     }

    baseMap<T>(url): Observable<T> {
        return this.httpClient.get(url)
            .pipe(
                map(r => r.json()),
                map(json => json.map(p => this.classToCreate.parseJson(p))));
    }

    baseSingleMap(url): Observable<T> {
        return this.baseSingleMapClass<T>(url, this.classToCreate);
    }

    baseSingleMapWithParams(url, params): Observable<T> {
        return this.baseSingleMapWithParamsAndClass<T>(url, params, this.classToCreate);
    }

    baseSingleMapClass<R>(url, classToCreate: JsonParser<R>): Observable<R> {
        return this.httpClient.get(url)
        .pipe(
            map(r => r.json()),
            map(json => classToCreate.parseJson(json)));
    }

    baseSingleMapWithParamsAndClass<R>(url, params, classToCreate: JsonParser<R>): Observable<R> {
        return this.httpClient.get(url, params)
            .pipe(
                map(r => r.json()),
                map(json => classToCreate.parseJson(json)));
    }

    baseMapWithParams(url, params): Observable<T> {
        return this.baseMapWithParamsAndClass<T>(url, params, this.classToCreate);
    }

    baseMapWithParamsAndClass<R>(url, params, classToCreate: JsonParser<R>): Observable<R> {
        return this.httpClient.get(url, params).pipe(
            map(r => r.json()),
            map(json => json.map(p => classToCreate.parseJson(p)))
        );
    }
}
